const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async run(member, client) {
		if (await db.fetch('logch_' + member.guild.id)) {
			const logChannel = await db.fetch('logch_' + member.guild.id);
			const logch = member.guild.channels.cache.find((ch) => ch.id === logChannel);

			let logEmbed = {
				color: 0xe60ffa,
				author: {
					name: `${member.user.username}#${member.user.discriminator}`,
					icon_url: member.user.displayAvatarURL({ format: 'png', dynamic: true }),
				},
				title: translate(member, 'events.guildMemberRemove.messages.embedTitle'),
				description: translate(member, 'events.guildMemberRemove.messages.embedDescription', member.user.id),
			};

			member.roles.cache.map((role) => {
				logEmbed.description += `${role}`;
			});
			return logch.send({ embed: logEmbed });
		}
	},
};
