const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async run(member, client) {
		if (member.guild) {
			const guildId = member.guild.id;

			let language;
			if (await db.fetch('lang_' + guildId)) {
				language = await db.fetch('lang_' + guildId);
			} else {
				language = 'tr';
			}

			if (await db.fetch('autorole_' + guildId)) {
				const autoRole = await db.fetch('autorole_' + guildId);
				const role = member.guild.roles.cache.find((role) => role.id === autoRole);
				member.roles.add(role);
			}

			if (await db.fetch('welcomech_' + guildId)) {
				const welcomechid = await db.fetch('welcomech_' + guildId);
				const welcomech = member.guild.channels.cache.find((ch) => ch.id == welcomechid);
				const welcomeMessages = require(`../languages/${language}.json`).events.guildMemberAdd.messages
					.welcomeMessages;

				if (welcomech) {
					const randomMessageIndex = Math.floor(Math.random() * welcomeMessages.length);
					let randomMessage = welcomeMessages[randomMessageIndex];
					randomMessage = randomMessage.replace(/{(\d)}/gi, member);
					welcomech.send(randomMessage);
				}
			}
		}
	},
};
