const db = require("wio.db");

module.exports = {
    name: "messageDeleteBulk",
    once: false,
    async run(messages, client) {
        if (messages.first().guild) {
            const message = messages.first();
            if (await db.fetch("logch_" + message.guild.id)) {
                const logChannel = await db.fetch("logch_" + message.guild.id);
                const logch = message.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: `${messages.size} Mesaj Silindi - #${message.channel.name}`,
                    description: ""
                };

                messages.sort().map((message) => {
                    if (
                        message.author.bot ||
                        message.channel.name == logch.name
                    ) {
                        logEmbed.description += "";
                    } else {
                        logEmbed.description += `[**${message.author.username}#${message.author.discriminator}**] ${message.content}\n`;
                    }
                });

                if (logEmbed.description.length > 2000) {
                    logEmbed.description =
                        "Mesaj boyutu 2000 karakteri aştığı için görüntülenemiyor.";
                    return logch.send({ embed: logEmbed });
                }

                if (logEmbed.description != "") {
                    return logch.send({ embed: logEmbed });
                }
            }
        }
    }
};
