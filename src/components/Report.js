import jsPDF from "jspdf";
import "jspdf-autotable";

import { isLogin, getOwner } from "../routes/isLoggedIn";
import { convertDate } from "../utils/convertDate";

const session = isLogin();
const funeraria = getOwner();

const today = new Date().toLocaleString("pt-BR");

const generatePDF = (tableColumns, data, report) => {
	// starta o jsPDF
	const doc = new jsPDF();

	const pageSize = doc.internal.pageSize;
	const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

	// valores das colunas
	const tableRows = [];

	if (report === "Urnas") {
		data.forEach((item) => {
			const itemData = [
				item.ref_urna,
				item.nome_urna,
				item.classe_urna,
				item.cor_urna,
				item.quantidade,
			];

			tableRows.push(itemData);
		});
	} else if (report === "Movimentações") {
		data.forEach((item) => {
			const itemData = [
				item.tipo_mov,
				item.ref_urna,
				item.cor_urna,
				item.qtde_mov,
				convertDate(item.dt_hr_mov),
			];

			tableRows.push(itemData);
		});
	}

	/////////////////// HEADER ///////////////////

	//linha 1
	doc.text(funeraria.nome_owner, 14, 15);

	//muda fonte
	doc.setFontSize(12);

	//linha 2
	doc.text("Endereço: ", 14, 25);

	//linha 3
	doc.text("Cidade: ", 14, 30);

	//linha 4
	doc.text("Telefone: ", 14, 35);

	//linha 5
	doc.text("Email: ", 14, 40);

	//linha 6
	doc.setFontSize(10);
	doc.text("Usuário logado: ", 14, 48);
	const widthUser = doc.getTextWidth("Usuário logado: ");
	doc.text(session.user, widthUser + 14, 48);

	const widthToday = doc.getTextWidth(today);
	doc.text(today, pageWidth - widthToday - 14, 48);

	//muda cor da fonte
	doc.setTextColor(100);
	doc.setFontSize(12);
	const widthAddress = doc.getTextWidth("Endereço: ");
	doc.text(funeraria.end_owner, widthAddress + 14, 25);
	doc.text(
		` - ${funeraria.bairro_owner}`,
		doc.getTextWidth(funeraria.end_owner) + widthAddress + 14,
		25
	);

	const widthCity = doc.getTextWidth("Cidade: ");
	doc.text(funeraria.cidade_owner, widthCity + 14, 30);
	doc.text(
		`, ${funeraria.estado_owner}`,
		doc.getTextWidth(funeraria.cidade_owner) + widthCity + 14,
		30
	);

	const widthPhone = doc.getTextWidth("Telefone: ");
	doc.text(funeraria.tel_owner, widthPhone + 14, 35);

	const widthEmail = doc.getTextWidth("Email: ");
	doc.text(funeraria.email_owner, widthEmail + 14, 40);

	// doc.setDrawColor(89, 191, 255);
	doc.setLineWidth(0.5);
	doc.line(14, 50, pageWidth - 14, 50);

	doc.setFontSize(18);
	doc.setTextColor(28, 28, 28);
	doc.text(`Relatório de ${report}`, pageWidth / 2, 60, { align: "center" });

	const totalPagesExp = "{total_pages_count_string}";

	//starta a tabela
	doc.autoTable(tableColumns, tableRows, {
		startY: 70,
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
