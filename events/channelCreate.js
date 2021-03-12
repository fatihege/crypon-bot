const db = require("wio.db");

module.exports = {
    name: "channelCreate",
    once: false,
    async run(channel, client) {
        if (channel.guild) {
            if (await db.fetch("logch_" + channel.guild.id)) {
                const logChannel = await db.fetch("logch_" + channel.guild.id);
                const logch = channel.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed;

                if (channel.type == "category") {
                    logEmbed = {
                        color: 0xe60ffa,
                        title: "Kategori Oluşturuldu",
                        description: `**${channel.name}** kategorisi oluşturuldu.`
                    };
                } else {
                    logEmbed = {
                        color: 0xe60ffa,
                        title: "Kanal Oluşturuldu",
                        description: `<#${channel.id}> kanalı oluşturuldu.`
                    };
                }

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
