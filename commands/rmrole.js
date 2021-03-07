module.exports = {
    name: "rmrole",
    description: "Belirlediğiniz üyeden istediğiniz rolü kaldırın.",
    aliases: ["removerole", "rolkaldir"],
    args: true,
    usage: "<member> <role>",
    guildOnly: true,
    permissions: "MANAGE_ROLES",
    run(message, args, client) {
        const member = message.mentions.members.first();
        const taggedRole = message.guild.roles.cache.find(
            (role) => role === message.mentions.roles.first()
        );
        const admin = message.guild.members.cache.find((m) =>
            m.hasPermission("ADMINISTRATOR")
        );

        if (admin.id == member.id && message.author.id != admin.id) {
            return message
                .reply("Sunucu yöneticisinden herhangi bir rolü kaldıramazsın!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (member.id == message.author.id && member.id != admin.id) {
            return message
                .reply(`Bir rolü kendinden kaldıramazsın!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (member == undefined) {
            return message
                .reply(`Lütfen geçerli bir üye etiketle!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (taggedRole == undefined) {
            return message
                .reply(`Lütfen geçerli bir rol etiketle!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        try {
            member.roles.remove(taggedRole);
            message.channel
                .send(`${taggedRole} rolü ${member} üyesinden **kaldırıldı**.`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel
                .send(
                    `${taggedRole} rolü ${member} üyesine eklenirken bir **sorun oluştu**.`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
    }
};
