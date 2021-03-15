const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'messageUpdate',
	once: false,
	async run(oldMessage, newMessage, client) {
		if (oldMessage.guild && (await db.fetch('logch_' + oldMessage.guild.id))) {
			if (oldMessage.author.bot) return;
			if (oldMessage.content == newMessage.content) return;
			console.log(oldMessage.content, newMessage.content);

			const logChannel = await db.fetch('logch_' + oldMessage.guild.id);
			const logch = oldMessage.guild.channels.cache.find((ch) => ch.id === logChannel);

			const before = translate(oldMessage, "basic.before");
			const after = translate(oldMessage, "basic.after");

			let logEmbed = {
				color: 0xe60ffa,
				author: {
					name: `${oldMessage.author.username}#${oldMessage.author.discriminator}`,
					icon_url: oldMessage.author.displayAvatarURL({ format: 'png', dynamic: true }),
				},
				title: translate(oldMessage, 'events.messageUpdate.messages.embedTitle', oldMessage.channel.name),
				description: `**${before}:** ${oldMessage.content}\n**${after}:** ${newMessage.content}`,
			};

			if (logEmbed.description.length > 2000) {
				logEmbed.description = translate(oldMessage, "basic.over2000");
			}
			logch.send({ embed: logEmbed });
		}
	},
};
