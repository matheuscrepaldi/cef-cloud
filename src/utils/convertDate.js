function convertDate(dateTime) {
	const date = dateTime.split("T");
	const ymd = date[0].split("-");
	const converted = `${ymd[2]}/${ymd[1]}/${ymd[0]} ${date[1]}:00`;

	return converted;
}

function today() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var localDatetime =
		year +
		"-" +
		(month < 10 ? "0" + month.toString() : month) +
		"-" +
		(day < 10 ? "0" + day.toString() : day) +
		"T" +
		(hour < 10 ? "0" + hour.toString() : hour) +
		":" +
		(minute < 10 ? "0" + minute.toString() : minute);

	return localDatetime;
}

export { convertDate, today };
