const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'roleCreate',
	once: false,
	async run(role) {
		if (role.guild) {
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

			if (await db.fetch('logch_' + role.guild.id)) {
				const logChannel = await db.fetch('logch_' + role.guild.id);
				const logch = role.guild.channels.cache.find((ch) => ch.id === logChannel);

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(role, 'events.roleCreate.messages.embedTitle'),
					description: translate(
						role,
						'events.roleCreate.messages.embedDescription',
						role.name,
						role.hexColor,
						role.mentionable ? yes : no
					),
				};

				return logch.send({ embed: logEmbed });
			}
		}
	},
};
