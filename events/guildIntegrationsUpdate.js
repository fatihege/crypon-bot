const db = require("wio.db");

module.exports = {
    name: "guildIntegrationsUpdate",
    once: false,
    async run(guild, client) {
        if (await db.fetch("logch_" + guild.id)) {
            const logChannel = await db.fetch("logch_" + guild.id);
            const logch = guild.channels.cache.find(
                (ch) => ch.id === logChannel
            );

            let logEmbed = {
                color: 0xe60ffa,
                title: `Entegrasyon Güncellendi`,
                description: `Sunucunun entegrasyonları güncellendi.`
            };

            return logch.send({ embed: logEmbed });
        }
    }
};
