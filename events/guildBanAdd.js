const db = require("wio.db");

module.exports = {
    name: "guildBanAdd",
    once: false,
    async run(guild, user, client) {
        if (await db.fetch("logch_" + guild.id)) {
            const logChannel = await db.fetch("logch_" + guild.id);
            const logch = guild.channels.cache.find(ch => ch.id === logChannel);
            
            let logEmbed = {
                color: 0xe60ffa,
									author: {
										name: `${user.username}#${user.discriminator}`,
										icon_url: user.displayAvatarURL({ format: "png", dynamic: true })
									},
                title: `Üye Engellendi`,
								description: `<@${user.id}> sunucudan engellendi.`
            };

						return logch.send({ embed: logEmbed });
        }
    }
}