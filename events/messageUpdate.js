const db = require("wio.db");

module.exports = {
    name: "messageUpdate",
    once: false,
    async run(oldMessage, newMessage, client) {
        if (oldMessage.guild) {
            if (await db.fetch("logch_" + oldMessage.guild.id)) {
                if (!oldMessage.guild || oldMessage.author.bot) return;
            
                const logChannel = await db.fetch("logch_" + oldMessage.guild.id);
                const logch = oldMessage.guild.channels.cache.find(ch => ch.id === logChannel);
            
                let logEmbed = {
                    color: 0xe60ffa,
										author: {
											name: `${oldMessage.author.username}#${oldMessage.author.discriminator}`,
											icon_url: oldMessage.author.displayAvatarURL({ format: "png", dynamic: true })
										},
                    title: `Mesaj Düzenlendi - #${oldMessage.channel.name}`,
										description: `**Önce:** ${oldMessage.content}\n**Sonra:** ${newMessage.content}`
                };
								
								return logch.send({ embed: logEmbed });
            }
        }
    }
}