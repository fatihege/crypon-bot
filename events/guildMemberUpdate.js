const db = require("wio.db");

module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async run(oldMember, newMember, client) {
        if (await db.fetch("logch_" + oldMember.guild.id)) {
            const logChannel = await db.fetch("logch_" + oldMember.guild.id);
            const logch = oldMember.guild.channels.cache.find(ch => ch.id === logChannel);

						if (oldMember.user.bot || newMember.user.bot) return;
            
            let logEmbed = {
                color: 0xe60ffa,
									author: {
										name: `${newMember.user.username}#${newMember.user.discriminator}`,
										icon_url: newMember.user.displayAvatarURL({ format: "png", dynamic: true })
									},
                title: `Üye Güncellendi`,
								description: `**Eski Ad:** ${oldMember.displayName}\n**Yeni Ad:** ${newMember.displayName}\n\n**Eski Roller:** ${oldMember.roles.cache.map(role => `${role}`)}\n**Yeni Roller:** ${newMember.roles.cache.map(role => `${role}`)}\n\n**Eski Resim:** ${oldMember.user.displayAvatarURL({ format: "png", dynamic: false })}\n**Yeni Resim:** ${newMember.user.displayAvatarURL({ format: "png", dynamic: false })}`
            };

						return logch.send({ embed: logEmbed });
        }
    }
}