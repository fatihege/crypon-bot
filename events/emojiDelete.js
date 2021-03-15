const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'emojiDelete',
	once: false,
	async run(emoji, client) {
		if (emoji.guild) {
			if (await db.fetch('logch_' + emoji.guild.id)) {
				const logChannel = await db.fetch('logch_' + emoji.guild.id);
				const logch = emoji.guild.channels.cache.find((ch) => ch.id === logChannel);

				const animated = emoji.animated
					? translate(emoji, 'basic.yes')
					: translate(emoji, 'basic.no');

				let logEmbed = {
					color: 0xe60ffa,
					title: translate(emoji, "events.emojiDelete.messages.embedTitle"),
					description: translate(
						emoji,
						'events.emojiDelete.messages.embedDescription',
						emoji.name,
						emoji.id,
						animated,
						emoji.url
					),
				};

				return logch.send({ embed: logEmbed });
			}
		}
	},
};
