const db = require('wio.db');
const { readdirSync } = require('fs');
const path = require('path');

function translate(event, wordPath, ...args) {
	const files = readdirSync(path.join(__dirname, '../', 'languages')).find((file) => file.endsWith('.json'));

	if (!files.length) {
		return 'Herhangi bir dil dosyası bulunamadı!';
	}

	let language;
	if (event.guild && db.fetch('lang_' + event.guild.id)) {
		language = db.fetch('lang_' + event.guild.id);
	} else if (event.channel && event.channel.type == 'dm' && db.fetch('lang_dm_' + event.channel.id)) {
		language = db.fetch('lang_dm_' + event.channel.id);
	} else {
		language = 'tr';
	}

	var text = eval(`require("../languages/${language}.json").${wordPath}`);

	const textArray = text.split(' ');
	var matches = [];
	textArray.forEach((txt) => {
		let match = txt.match(/{(\d)*}/g);
		if (match) {
			matches[matches.length + 1] = match;
		}
	});

	for (let i = 0; i < matches.length; i++) {
		text = text.replace(eval(`/{(${i})*}/g`), args[i]);
	}

	return text;
}

module.exports = translate;
