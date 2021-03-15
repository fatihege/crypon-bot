const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'guildBanAdd',
	once: false,
	async run(guild, user, client) {
		if (await db.fetch('logch_' + guild.id)) {
			const logChannel = await db.fetch('logch_' + guild.id);
			const logch = guild.channels.cache.find((ch) => ch.id === logChannel);

            const aChannel = guild.channels.cache.first();

			let logEmbed = {
				color: 0xe60ffa,
				author: {
					name: `${user.username}#${user.discriminator}`,
					icon_url: user.displayAvatarURL({ format: 'png', dynamic: true }),
				},
				title: translate(aChannel, 'events.guildBanAdd.messages.embedTitle'),
				description: translate(aChannel, 'events.guildBanAdd.messages.embedDescription', user.id),
			};

			return logch.send({ embed: logEmbed });
		}
	},
};
