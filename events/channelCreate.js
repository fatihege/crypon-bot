const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'channelCreate',
	once: false,
	async run(channel, client) {
		if (channel.guild && (await db.fetch('logch_' + channel.guild.id))) {
			const logChannel = await db.fetch('logch_' + channel.guild.id);
			const logch = channel.guild.channels.cache.find((ch) => ch.id === logChannel);

			let logEmbed;

			if (channel.type == 'category') {
				logEmbed = {
					color: 0xe60ffa,
					title: translate(channel, 'events.channelCreate.messages.categoryCreatedTitle'),
					description: translate(
						channel,
						'events.channelCreate.messages.categoryCreatedDescription',
						channel.name
					),
				};
			} else {
				logEmbed = {
					color: 0xe60ffa,
					title: translate(channel, 'events.channelCreate.messages.channelCreatedTitle'),
					description: translate(
						channel,
						'events.channelCreate.messages.channelCreatedDescription',
						channel.id
					),
				};
			}

			return logch.send({ embed: logEmbed });
		}
	},
};
