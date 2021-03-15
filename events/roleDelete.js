const dateFormat = require('dateformat');
const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'roleDelete',
	once: false,
	async run(role) {
		if (role.guild) {
			let language;
			if (role.guild && (await db.fetch('lang_' + role.guild.id))) {
				language = await db.fetch('lang_' + role.guild.id);
			} else if (
				role.channel &&
				role.channel.type == 'dm' &&
				(await db.fetch('lang_dm_' + role.channel.id))
			) {
				language = await db.fetch('lang_dm_' + role.channel.id);
			} else {
				language = 'tr';
			}
			const datetimeConf = require(`../languages/${language}.json`).basic.date.datetime;
			dateFormat.i18n = {
				dayNames: datetimeConf.dayNames,
				monthNames: datetimeConf.monthNames,
				timeNames: datetimeConf.timeNames,
			};

			if (
				(await db.fetch('autorole_' + role.guild.id)) &&
				(await db.fetch('autorole_' + role.guild.id)) == role.id
			) {
				await db.delete('autorole_' + role.guild.id);
			}
			if (await db.fetch('logch_' + role.guild.id)) {
				const logChannel = await db.fetch('logch_' + role.guild.id);
				const logch = role.guild.channels.cache.find((ch) => ch.id === logChannel);

                let yes, no;
                if (translate(role, 'basic.yes') == 'Var') {
                    yes = 'Evet';
                } else {
                    yes = translate(role, 'basic.yes');
                }
                if (translate(role, 'basic.no') == 'Yok') {
                    no = 'Hayır';
                } else {
                    no = translate(role, 'basic.no');
                }

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(role, 'events.roleDelete.messages.embedTitle'),
					description: translate(
						role,
						'events.roleDelete.messages.embedDescription',
						role.name,
						role.hexColor,
						role.mentionable ? yes : no,
						dateFormat(role.createdAt, 'd mmmm dddd yyyy, h.MM.ss TT')
					),
				};

				return logch.send({ embed: logEmbed });
			}
		}
	},
};
