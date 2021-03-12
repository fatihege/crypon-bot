const db = require("wio.db");

module.exports = {
    name: "channelUpdate",
    once: false,
    async run(oldChannel, newChannel, client) {
        if (oldChannel.guild) {
            if (await db.fetch("logch_" + oldChannel.guild.id)) {
                const logChannel = await db.fetch(
                    "logch_" + oldChannel.guild.id
                );
                const logch = oldChannel.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed;

                if (oldChannel.type == "category") {
                    logEmbed = {
                        color: 0xe60ffa,
                        title: "Kategori Güncellendi",
                        description: ""
                    };
                } else {
                    logEmbed = {
                        color: 0xe60ffa,
                        title: "Kanal Güncellendi",
                        description: ""
                    };
                }

                if (oldChannel.name.toString() != newChannel.name.toString()) {
                    if (oldChannel.type == "category") {
                        logEmbed.description = `**${newChannel.id}** Kategorisi güncellendi.\n\n**Eski Ad:** ${oldChannel.name}\n**Yeni Ad:** ${newChannel.name}`;
                    } else {
                        logEmbed.description = `<#${newChannel.id}> kanalı güncellendi.\n\n**Eski Ad:** ${oldChannel.name}\n**Yeni Ad:** ${newChannel.name}`;
                    }
                    return logch.send({ embed: logEmbed });
                }
            }
        }
    }
};
