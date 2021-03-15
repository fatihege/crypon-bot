const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'emojiUpdate',
	once: false,
	async run(oldEmoji, newEmoji, client) {
		if (oldEmoji.guild && (await db.fetch('logch_' + oldEmoji.guild.id))) {
			const logChannel = await db.fetch('logch_' + oldEmoji.guild.id);
			const logch = oldEmoji.guild.channels.cache.find((ch) => ch.id === logChannel);

			const oldEmojiAnimated = oldEmoji.animated
				? translate(oldEmoji, 'basic.yes')
				: translate(oldEmoji, 'basic.no');
			const newEmojiAnimated = newEmoji.animated
				? translate(newEmoji, 'basic.yes')
				: translate(newEmoji, 'basic.no');

			let logEmbed = {
				color: 0xe60ffa,
				title: translate(oldEmoji, 'events.emojiUpdate.messages.embedTitle'),
				description: oldEmoji.id,
				fields: [
					{
						name: `**${translate(oldEmoji, 'basic.before')}**`,
						value: translate(
							oldEmoji,
							'events.emojiUpdate.messages.embedDescription',
							oldEmoji.name,
							oldEmojiAnimated,
							oldEmoji.url
						),
					},
					{
						name: `**${translate(oldEmoji, 'basic.after')}**`,
						value: translate(
							oldEmoji,
							'events.emojiUpdate.messages.embedDescription',
							newEmoji.name,
							newEmojiAnimated,
							newEmoji.url
						),
					},
				],
			};

			return logch.send({ embed: logEmbed });
		}
	},
};
