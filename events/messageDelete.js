const db = require("wio.db");

module.exports = {
    name: "messageDelete",
    once: false,
    async run(message, client) {
        if (message.guild) {
					if (await db.fetch("logch_" + message.guild.id)) {
						const logChannel = await db.fetch("logch_" + message.guild.id);
				
						const logch = message.guild.channels.cache.find(ch => ch.id === logChannel);
				
						let logEmbed = {
								color: 0xe60ffa,
								author: {
									name: `${message.author.username}#${message.author.discriminator}`,
									icon_url: message.author.displayAvatarURL({ format: "png", dynamic: true })
								},
								title: `Mesaj Silindi - #${message.channel.name}`,
								description: message.content
						};
				
						if (message.author.bot) return;
						
						return logch.send({ embed: logEmbed });
					}
				} else {
					message.channel.send("Sunucu bilgisi alınamadı. Lütfen geliştiricimle iletişime geçin: https://fatihege.github.io/");
				}
    }
}