const translate = require('../language/translate');
const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = {
	name: 'languages',
	description: null,
	aliases: ['langs', 'diller'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	async run(message, args, client) {
		this.description = translate(message, 'commands.languages.description');
		this.usage = translate(message, 'commands.languages.usage');

		let languages = [];
		let languageCodes = [];
		const languagesFilter = readdirSync(join(__dirname, '../', 'languages'))
			.filter((file) => {
				file.endsWith('.json').toString();
				if (file.endsWith('.json')) {
					languages.push(require(`../languages/${file}`).languageName);
					languageCodes.push(file.replace(/\.json/gi, ''));
				}
			})
			.join('\n')
			.toString()
			.replace(/\.json/gi, '');
		if (!languages || !languages.length) {
			return message.channel.send(translate(message, 'commands.languages.messages.langsNotFound'));
		}

		let embed = {
			color: 0xff14b9,
			title: translate(message, 'commands.languages.messages.embedTitle'),
			description: ""
		};
		
		for (let i = 0; i < languageCodes.length; i++) {
			embed.description += `**\`[${languageCodes[i]}]\`** ${languages[i]}\n`
		}

		return message.channel.send({ embed: embed });
	},
};
