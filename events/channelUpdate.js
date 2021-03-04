const db = require("wio.db");

module.exports = {
    name: "channelUpdate",
    once: false,
    async run(oldChannel, newChannel, client) {
        if (oldChannel.guild) {
            if (await db.fetch("logch_" + oldChannel.guild.id)) {
                const logChannel = await db.fetch("logch_" + oldChannel.guild.id);
                const logch = oldChannel.guild.channels.cache.find(ch => ch.id === logChannel);
            
                let logEmbed = {
                    color: 0xe60ffa,
                    title: "Kanal Güncellendi",
										description: ""
                };
								
								if (oldChannel.name.toString() != newChannel.name.toString()) {
									logEmbed.description = `<#${newChannel.id}> kanalı güncellendi.\n\n**Eski Ad:** ${oldChannel.name}\n**Yeni Ad:** ${newChannel.name}`;
									return logch.send({ embed: logEmbed });
								}
            }
        }
    }
}