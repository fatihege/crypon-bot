const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'channelUpdate',
	once: false,
	async run(oldChannel, newChannel, client) {
		if (oldChannel.guild) {
			if (await db.fetch('logch_' + oldChannel.guild.id)) {
				const logChannel = await db.fetch('logch_' + oldChannel.guild.id);
				const logch = oldChannel.guild.channels.cache.find((ch) => ch.id === logChannel);

				let logEmbed;

				if (oldChannel.type == 'category') {
					logEmbed = {
						color: 0xe60ffa,
						title: translate(oldChannel, 'events.channelUpdate.messages.categoryUpdatedTitle'),
						description: '',
					};
				} else {
					logEmbed = {
						color: 0xe60ffa,
						title: translate(oldChannel, 'events.channelUpdate.messages.channelUpdatedTitle'),
						description: '',
					};
				}

				if (oldChannel.name.toString() != newChannel.name.toString()) {
					if (oldChannel.type == 'category') {
						logEmbed.description = translate(
							oldChannel,
							'events.channelUpdate.messages.categoryUpdatedDescription',
							newChannel.name,
							oldChannel.name,
							newChannel.name
						);
					} else {
						logEmbed.description = translate(
							oldChannel,
							'events.channelUpdate.messages.channelUpdatedDescription',
							newChannel.id,
							oldChannel.name,
							newChannel.name
						);
					}
					return logch.send({ embed: logEmbed });
				}
			}
		}
	},
};
