const db = require("wio.db");

module.exports = {
    name: "guildBanRemove",
    once: false,
    async run(guild, user, client) {
        if (await db.fetch("logch_" + guild.id)) {
            const logChannel = await db.fetch("logch_" + guild.id);
            const logch = guild.channels.cache.find(
                (ch) => ch.id === logChannel
            );

            let logEmbed = {
                color: 0xe60ffa,
                title: `Kullanıcı Engeli Kaldırıldı`,
                description: `<@${user.id}> kullanıcısının engeli kaldırıldı.`
            };

            return logch.send({ embed: logEmbed });
        }
    }
};
