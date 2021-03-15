const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'messageDeleteBulk',
	once: false,
	async run(messages, client) {
		if (messages.first().guild) {
			const message = messages.first();
			if (await db.fetch('logch_' + message.guild.id)) {
				const logChannel = await db.fetch('logch_' + message.guild.id);
				const logch = message.guild.channels.cache.find((ch) => ch.id === logChannel);

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(
						messages.first(),
						'events.messageDeleteBulk.messages.embedTitle',
						messages.size,
						message.channel.name
					),
					description: '',
				};

				messages.sort().map((message) => {
					logEmbed.description += `[**${message.author.tag}**] ${message.content}\n`;
				});

				if (logEmbed.description.length > 2000) {
					logEmbed.description = translate(messages.first(), 'basic.over2000');
					return logch.send({ embed: logEmbed });
				}

				if (logEmbed.description != '') {
					return logch.send({ embed: logEmbed });
				}
			}
		}
	},
};
