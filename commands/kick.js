const db = require("wio.db");

module.exports = {
    name: "kick",
    description: "Bir üyeyi sunucudan atın.",
    aliases: ["mkick", "uyeat"],
    args: true,
    usage: "<üye> <sebep[opsiyonel]>",
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    async run(message, args, client) {
        let userid;

        if (message.mentions.members.size) {
            userid = message.mentions.members.first().id;
        } else {
            userid = args[0];
        }

        const user = message.guild.members.cache.find((m) => m.id == userid);

        if (!user) {
            return message.channel.send("Böyle bir üye yok!").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }

        if (user.id == client.user.id) {
            return message
                .reply(`Hey sen! Beni bu komutla **atamazsın!**`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (user.hasPermission("ADMINISTRATOR")) {
            return message
                .reply("Yavaş ol, bir yönetici kendi sunucusundan atılamaz!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const reason = args.slice(1).join(" ") || null;

        try {
            user.kick(reason);
            if (reason) {
                return message.channel
                    .send(
                        `<@${user.id}> sunucudan başarıyla **atıldı!**\n**Sebebi:** ${reason}`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } else {
                return message.channel
                    .send(`<@${user.id}> sunucudan başarıyla **atıldı!**`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        } catch (error) {
            if (error) {
                console.error(error);
                message.channel
                    .send(
                        `<@${user.id}> sunucudan atılırken bir **hata oluştu.**`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        }
    }
};
