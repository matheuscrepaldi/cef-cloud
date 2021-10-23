export default function convertDate(dateTime) {
	const date = dateTime.split("T");
	const ymd = date[0].split("-");
	const converted = `${ymd[2]}/${ymd[1]}/${ymd[0]} ${date[1]}:00`;

	return converted;
}
