const { botName } = require("../config.json");

module.exports = {
    name: "grole",
    description: "Belirlediğiniz üyeye istediğiniz rolü verin.",
    aliases: ["giverole", "rolver"],
    args: true,
    usage: "<üye> <rol>",
    guildOnly: true,
    permissions: "MANAGE_ROLES",
    run(message, args, client) {
        if (args.length > 2) {
            return message.channel
                .send("Bu komut en fazla 2 argüman alıyor!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
        let memberid;
        if (message.mentions.members.size) {
            memberid = message.mentions.members.first().id;
        } else {
            if (args[0].startsWith("<@")) {
                memberid = args[1];
            } else {
                memberid = args[0];
            }
        }
        const member = message.guild.members.cache.find(
            (m) => m.id == memberid
        );
        if (!member) {
            return message.channel.send("Böyle bir üye yok!").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }
        const taggedRole = message.guild.roles.cache.find(
            (role) => role === message.mentions.roles.first()
        );
        const botRole = message.guild.roles.cache.find(
            (role) => role.name == botName.toString()
        );

        if (botRole && botRole.position < taggedRole.position) {
            return message
                .reply(
                    `Bu işlemi gerçekleştirebilmem için benim rolümün daha yukarıda olması gerekiyor. Lütfen benim rolümü yukarıya al.`
                )
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
            member.roles.add(taggedRole);
            message.channel
                .send(`${taggedRole} rolü ${member} üyesine **eklendi**.`)
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

        message.delete({ timeout: 5000 });
    }
};
