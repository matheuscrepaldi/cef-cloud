import jsPDF from "jspdf";
import "jspdf-autotable";

import { isLogin } from "../routes/isLoggedIn";

const session = isLogin();
const today = new Date().toLocaleString("pt-BR");

const generatePDF = (tableColumns, data, report) => {
	// starta o jsPDF
	const doc = new jsPDF();

	const pageSize = doc.internal.pageSize;
	const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

	// valores das colunas
	const tableRows = [];

	// popular dados no array
	data.forEach((item) => {
		const itemData = [
			item.id_urna,
			item.ref_urna,
			item.nome_urna,
			item.quantidade,
		];

		tableRows.push(itemData);
	});

	/////////////////// HEADER ///////////////////

	//linha 1
	doc.text("Funerária teste", 14, 15);

	//muda fonte
	doc.setFontSize(12);

	//linha 2
	doc.text("Endereço: ", 14, 25);

	//linha 3
	doc.text("Cidade: ", 14, 30);

	//linha 4
	doc.text("Telefone: ", 14, 35);

	//linha 5
	doc.setFontSize(10);
	doc.text("Usuário logado: ", 14, 43);
	const widthUser = doc.getTextWidth("Usuário logado: ");
	doc.text(session.user, widthUser + 14, 43);

	const widthToday = doc.getTextWidth(today);
	doc.text(today, pageWidth - widthToday - 14, 43);

	//muda cor da fonte
	doc.setTextColor(100);
	doc.setFontSize(12);
	const widthAddress = doc.getTextWidth("Endereço: ");
	doc.text("toma toma", widthAddress + 14, 25);

	// doc.setDrawColor(89, 191, 255);
	doc.setLineWidth(0.5);
	doc.line(14, 45, pageWidth - 14, 45);

	doc.setFontSize(18);
	doc.setTextColor(28, 28, 28);
	doc.text(`Relatório de ${report}`, pageWidth / 2, 60, { align: "center" });

	const totalPagesExp = "{total_pages_count_string}";

	//starta a tabela
	doc.autoTable(tableColumns, tableRows, {
		startY: 65,
		headStyles: {
			fillColor: [89, 191, 255],
			fontSize: 14,
		},
		addPageContent: (data) => {
			let footerStr = "Página " + doc.internal.getNumberOfPages();
			if (typeof doc.putTotalPages === "function") {
				footerStr = footerStr + " de " + totalPagesExp;
			}
			doc.setFontSize(10);
			doc.text(
				footerStr,
				data.settings.margin.left,
				doc.internal.pageSize.height - 10
			);
		},
	});

	if (typeof doc.putTotalPages === "function") {
		doc.putTotalPages(totalPagesExp);
	}

	// define nome do arquivo pdf
	doc.save(`relatorio${report}.pdf`);
};

export default generatePDF;
