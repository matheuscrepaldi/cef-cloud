import React, { useState, useEffect } from "react";
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

	const size = Math.ceil(count / 10);
	let buttons = [];

	for (let i = 1; i <= size; i++) {
		buttons.push(i);
	}

	useEffect(() => {
		setSelected(1);
	}, [count]);

	const handlePaginationChange = (id) => {
		if (selected === id) {
			return;
		}

		setSelected(id);
		const filter = `page=${id - 1}`;
		props.handlePaginationChange && props.handlePaginationChange(filter);
	};

	return (
		<Row style={{ justifyContent: "flex-end" }}>
			<Button
				small
				disabled={selected === 1 || buttons.length <= 1}
				onClick={() => handlePaginationChange(1)}
			>
				<BsChevronDoubleLeft size={20} />
			</Button>
			<Button
				small
				disabled={selected === 1 || buttons.length <= 1}
				onClick={() => handlePaginationChange(selected - 1)}
			>
				<BsChevronLeft size={20} />
			</Button>
			{buttons.map((button, key) => {
				return (
					<Button
						key={key}
						className={
							(selected === button || buttons.length <= 1) &&
							"selected"
						}
						onClick={() => handlePaginationChange(button)}
						small
					>
						{button}
					</Button>
				);
			})}
			<Button
				small
				disabled={
					selected === size || count === 0 || buttons.length <= 1
				}
				onClick={() => handlePaginationChange(selected + 1)}
			>
				<BsChevronRight size={20} />
			</Button>
			<Button
				small
				disabled={
					selected === size || count === 0 || buttons.length <= 1
				}
				onClick={() => handlePaginationChange(buttons.length)}
			>
				<BsChevronDoubleRight size={20} />
			</Button>
		</Row>
	);
}
