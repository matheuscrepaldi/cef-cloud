import React, { useState } from "react";
import {
	BsChevronLeft,
	BsChevronDoubleLeft,
	BsChevronDoubleRight,
	BsChevronRight,
} from "react-icons/bs";

import Row from "./Row";
import Button from "./Button";

export default function Pagination(props) {
	const [selected, setSelected] = useState(1);
	const { count } = props;

	const size = Math.ceil(count / 2);
	let buttons = [];

	for (let i = 1; i <= size; i++) {
		buttons.push(i);
	}

	const handleButtonChange = (id) => {
		if (selected === id) {
			return;
		}

		setSelected(id);

		props.handleButtonChange && props.handleButtonChange(id);
	};

	return (
		<Row style={{ justifyContent: "flex-end" }}>
			<Button
				small
				disabled={selected === 1}
				onClick={() => handleButtonChange(1)}
			>
				<BsChevronDoubleLeft size={20} />
			</Button>
			<Button
				small
				disabled={selected === 1}
				onClick={() => handleButtonChange(selected - 1)}
			>
				<BsChevronLeft size={20} />
			</Button>
			{buttons.map((button) => {
				return (
					<Button
						className={selected === button && "selected"}
						onClick={() => handleButtonChange(button)}
						small
					>
						{button}
					</Button>
				);
			})}
			<Button
				small
				disabled={selected === size}
				onClick={() => handleButtonChange(selected + 1)}
			>
				<BsChevronRight size={20} />
			</Button>
			<Button
				small
				disabled={selected === size}
				onClick={() => handleButtonChange(buttons.length)}
			>
				<BsChevronDoubleRight size={20} />
			</Button>
		</Row>
	);
}
