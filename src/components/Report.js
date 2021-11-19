import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a data argument
const generatePDF = (data) => {
	// initialize jsPDF
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ["Id", "Referência", "Nome", "Quantidade"];
	// define an empty array of rows
	const tableRows = [];

	// for each item pass all its data into an array
	data.forEach((item) => {
		const itemData = [
			item._id,
			item.ref_urna,
			item.nome_urna,
			item.quantidade,
		];
		// push each tickcet's info into a row
		tableRows.push(itemData);
	});

	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 20 });
	const date = Date().split(" ");
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// item title. and margin-top + margin-left
	doc.text("Closed data within the last one month.", 14, 15);
	// we define the name of our PDF file.
	doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
