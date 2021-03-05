const db = require("wio.db");

module.exports = {
    name: "emojiUpdate",
    once: false,
    async run(oldEmoji, newEmoji, client) {
        if (oldEmoji.guild) {
            if (await db.fetch("logch_" + oldEmoji.guild.id)) {
                const logChannel = await db.fetch("logch_" + oldEmoji.guild.id);
                const logch = oldEmoji.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: "Emoji Güncellendi",
                    description: oldEmoji.id,
                    fields: [
                        {
                            name: "|-**Önce**-|",
                            value: `**Adı:** ${oldEmoji.name}\n**Animasyon:** ${
                                oldEmoji.animated ? "Var" : "Yok"
                            }\n**Resim:** ${oldEmoji.url}`
                        },
                        {
                            name: "|-**Sonra**-|",
                            value: `**Adı:** ${newEmoji.name}\n**Animasyon:** ${
                                newEmoji.animated ? "Var" : "Yok"
                            }\n**Resim:** ${newEmoji.url}`
                        }
                    ]
                };

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
