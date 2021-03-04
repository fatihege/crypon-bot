const db = require("wio.db");

module.exports = {
    name: "guildUpdate",
    once: false,
    async run(oldGuild, newGuild, client) {
        if (oldGuild) {
            if (await db.fetch("logch_" + oldGuild.id)) {
                const logChannel = await db.fetch("logch_" + oldGuild.id);
                const logch = oldGuild.channels.cache.find(ch => ch.id === logChannel);
            
                let logEmbed = {
                    color: 0xe60ffa,
                    title: `Sunucu Güncellendi`,
										description: ``
                };

								if (oldGuild.name.toString() != newGuild.name.toString()) {
									logEmbed.description += `**Eski Ad:** ${oldGuild.name}\n**Yeni Ad:** ${newGuild.name}\n\n`
								}

								if (oldGuild.region.toString() != newGuild.region.toString()) {
									const oldRegion = oldGuild.region.charAt(0).toUpperCase() + oldGuild.region.slice(1);
									const newRegion = newGuild.region.charAt(0).toUpperCase() + newGuild.region.slice(1);
									logEmbed.description += `**Eski Bölge:** ${oldRegion}\n**Yeni Bölge:** ${newRegion}\n\n`
								}

								if (oldGuild.icon.toString() != newGuild.icon.toString()) {
									logEmbed.description += `**Eski Simge:** ${oldGuild.iconURL()}\n**Yeni Simge:** ${newGuild.iconURL({ format: "png", dynamic: false })}\n\n`
								}
								
								return logch.send({ embed: logEmbed });
            }
        }
    }
}