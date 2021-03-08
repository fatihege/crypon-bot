const db = require("wio.db");

module.exports = {
    name: "messageDelete",
    once: false,
    async run(message, client) {
        if (message.guild) {
            if (message.author.bot) return;

            if (await db.fetch("logch_" + message.guild.id)) {
                const logChannel = await db.fetch("logch_" + message.guild.id);
                const prefix = await db.fetch("prefix_" + message.guild.id);
                if (
                    message.content.startsWith(prefix + "mdel") ||
                    message.content.startsWith(prefix + "messagedelete") ||
                    message.content.startsWith(prefix + "mdelete") ||
                    message.content.startsWith(prefix + "msil") ||
                    message.content.startsWith(prefix + "mesajsil")
                ) {
                    return;
                }

                const logch = message.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.displayAvatarURL({
                            format: "png",
                            dynamic: true
                        })
                    },
                    title: `Mesaj Silindi - #${message.channel.name}`,
                    description: message.content
                };

                if (logEmbed.description.length > 2000) {
                    logEmbed.description =
                        "Mesaj boyutu 2000 karakteri aştığı için görüntülenemiyor.";
                    return logch.send({ embed: logEmbed });
                }

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
