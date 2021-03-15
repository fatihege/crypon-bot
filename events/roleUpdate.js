const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'roleUpdate',
	once: false,
	async run(oldRole, newRole) {
		if (oldRole.guild) {
			if (await db.fetch('logch_' + oldRole.guild.id)) {
				const logChannel = await db.fetch('logch_' + oldRole.guild.id);
				const logch = oldRole.guild.channels.cache.find((ch) => ch.id === logChannel);

				let yes, no;
				if (translate(oldRole, 'basic.yes') == 'Var') {
					yes = 'Evet';
				} else {
					yes = translate(oldRole, 'basic.yes');
				}
				if (translate(oldRole, 'basic.no') == 'Yok') {
					no = 'Hayır';
				} else {
					no = translate(oldRole, 'basic.no');
				}

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(oldRole, 'events.roleUpdate.messages.embedTitle'),
					fields: [
						{
							name: `**${translate(oldRole, 'basic.before')}**`,
							value: translate(
								oldRole,
								'events.roleUpdate.messages.embedDescription',
								oldRole.name,
								oldRole.hexColor,
								oldRole.mentionable ? yes : no
							),
						},
						{
							name: `**${translate(oldRole, 'basic.after')}**`,
							value: translate(
								newRole,
								'events.roleUpdate.messages.embedDescription',
								newRole.name,
								newRole.hexColor,
								newRole.mentionable ? yes : no
							),
						},
					],
				};

				if (logEmbed.fields[0].value.toString() == logEmbed.fields[1].value.toString()) {
					return;
				}

				return logch.send({ embed: logEmbed });
			}
		}
	},
};
