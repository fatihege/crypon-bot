const db = require("wio.db");

module.exports = {
    name: "emojiCreate",
    once: false,
    async run(emoji, client) {
        if (emoji.guild) {
            if (await db.fetch("logch_" + emoji.guild.id)) {
                const logChannel = await db.fetch("logch_" + emoji.guild.id);
                const logch = emoji.guild.channels.cache.find(ch => ch.id === logChannel);
            
                let logEmbed = {
                    color: 0xe60ffa,
                    title: "Emoji Oluşturuldu",
										description: `**Adı:** ${emoji.name}\n**ID:** ${emoji.id}\n**Animasyon:** ${emoji.animated ? "Var" : "Yok"}\n**Resim:** ${emoji.url}`
                };
								
								return logch.send({ embed: logEmbed });
            }
        }
    }
}