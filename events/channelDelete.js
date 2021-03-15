const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'channelDelete',
	once: false,
	async run(channel, client) {
		if (channel.guild && (await db.fetch('logch_' + channel.guild.id))) {
			if ((await db.fetch('logch_' + channel.guild.id)) == channel.id) {
				await db.delete('logch_' + channel.guild.id);
				return;
			} else if (await db.fetch('welcomech_' + channel.guild.id)) {
				await db.delete('welcomech_' + channel.guild.id);
			}
			const logChannel = await db.fetch('logch_' + channel.guild.id);
			const logch = channel.guild.channels.cache.find((ch) => ch.id === logChannel);

			let logEmbed;

			if (channel.type == 'category') {
				logEmbed = {
					color: 0xe60ffa,
					title: translate(channel, 'events.channelDelete.messages.categoryDeletedTitle'),
					description: translate(
						channel,
						'events.channelDelete.messages.categoryDeletedDescription',
						channel.name
					),
				};
			} else {
				logEmbed = {
					color: 0xe60ffa,
					title: translate(channel, 'events.channelDelete.messages.channelDeletedTitle'),
					description: translate(channel, 'events.channelDelete.messages.channelDeletedDescription', channel.name),
				};
			}

			return logch.send({ embed: logEmbed });
		}
	},
};
