const db = require("wio.db");

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async run(member, client) {
        if (await db.fetch("logch_" + member.guild.id)) {
            const logChannel = await db.fetch("logch_" + member.guild.id);
            const logch = member.guild.channels.cache.find(ch => ch.id === logChannel);
            
            let logEmbed = {
                color: 0xe60ffa,
									author: {
										name: `${member.user.username}#${member.user.discriminator}`,
										icon_url: member.user.displayAvatarURL({ format: "png", dynamic: true })
									},
                title: `Üye Ayrıldı`,
								description: `<@${member.user.id}> sunucudan ayrıldı.\n**Rolleri:** `
            };

            member.roles.cache.map(role => {
							logEmbed.description += `${role}`;
            });
						return logch.send({ embed: logEmbed });
        }
    }
}