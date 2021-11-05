import { useState } from "react";

export default function useDynamicForm(initialState = {}) {
	const [fields, setFields] = useState(initialState);

	const mask = (v) => {
		v = v.replace(/\D/g, "");

		if (v.length <= 11) {
			v = v.replace(/(\d{3})(\d)/, "$1.$2");
			v = v.replace(/(\d{3})(\d)/, "$1.$2");
			v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		} else {
			v = v.replace(/^(\d{2})(\d)/, "$1.$2");
			v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
			v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
			v = v.replace(/(\d{4})(\d)/, "$1-$2");
		}
		console.log(v);

		return v;
	};

	const handleInputChange = (e) => {
		e.preventDefault();

		const id = e.target.id;
		let value = e.target.value;

		if (id.startsWith("doc") || id.startsWith("cnpj")) {
			value = mask(e.target.value);
		}

		setFields({ ...fields, [`${id}`]: value });
	};

	return {
		fields,
		setFields,
		handleInputChange,
	};
}
