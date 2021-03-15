const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'guildIntegrationsUpdate',
	once: false,
	async run(guild, client) {
		if (await db.fetch('logch_' + guild.id)) {
			const logChannel = await db.fetch('logch_' + guild.id);
			const logch = guild.channels.cache.find((ch) => ch.id === logChannel);

			const aChannel = guild.channels.cache.first();

			let logEmbed = {
				color: 0xe60ffa,
				title: translate(aChannel, 'events.guildIntegrationsUpdate.messages.embedTitle'),
				description: translate(aChannel, 'events.guildIntegrationsUpdate.messages.embedDescription'),
			};

			return logch.send({ embed: logEmbed });
		}
	},
};
