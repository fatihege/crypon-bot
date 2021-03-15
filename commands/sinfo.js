const { botName } = require('../config.json');
const db = require('wio.db');
const translate = require('../language/translate');
const dateFormat = require('dateformat');

module.exports = {
	name: 'sinfo',
	description: null,
	aliases: ['serverinfo', 'sbilgi', 'sunucubilgi'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: null,
	async run(message, args, client) {
		this.description = translate(message, 'commands.sinfo.description');
		this.usage = translate(message, 'commands.sinfo.usage');

		let language;
		if (message.guild && (await db.fetch('lang_' + message.guild.id))) {
			language = await db.fetch('lang_' + message.guild.id);
		} else if (
			message.channel &&
			message.channel.type == 'dm' &&
			(await db.fetch('lang_dm_' + message.channel.id))
		) {
			language = await db.fetch('lang_dm_' + message.channel.id);
		} else {
			language = 'tr';
		}
		const datetimeConf = require(`../languages/${language}.json`).basic.date.datetime;
		dateFormat.i18n = {
			dayNames: datetimeConf.dayNames,
			monthNames: datetimeConf.monthNames,
			timeNames: datetimeConf.timeNames,
		};

		const server = message.guild;
		const serverCreatedAt = dateFormat(server.createdAt, 'd mmmm dddd yyyy, h.MM.ss TT');
		const guildRegion = server.region.charAt(0).toUpperCase() + server.region.slice(1);
		const commandembed = {
			color: 0xe60ffa,
			thumbnail: {
				url: server.iconURL({ format: 'png', dynamic: false }),
			},
			title: translate(message, "commands.sinfo.messages.embedTitle", server.name),
			description: translate(message, "commands.sinfo.messages.embedDescription", server.id, server.name, server.owner.user.tag, server.memberCount, serverCreatedAt, guildRegion, server.afkTimeout / 60, botName, (await db.fetch('prefix_' + message.guild.id)) ? await db.fetch('prefix_' + message.guild.id) : '!c'),
		};
		message.channel.send({ embed: commandembed });
	},
};
