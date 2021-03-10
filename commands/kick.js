const { botName } = require("../config.json");
const db = require("wio.db");

module.exports = {
    name: "kick",
    description: "Bir üyeyi sunucudan atın.",
    aliases: ["mkick", "uyeat"],
    args: true,
    usage: "<member> <reason[optional]>",
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    async run(message, args, client) {
        if (args[0] == client.user.id) {
            return message
                .reply(`Hey sen! Beni bu komutla **atamazsın!**`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (!args.length || args.length < 1) {
            if (await db.fetch("prefix_" + message.guild.id)) {
                var prefix = await db.fetch("prefix_" + message.guild.id);
            } else {
                var prefix = "!c";
            }
            return message
                .reply(
                    `Lütfen gerekli argümanları ver!\nBu komutun kullanımı \`${prefix}${this.name} ${this.usage}\``
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (
            message.guild.members.cache
                .find((m) => m.id == args[0])
                .hasPermission("ADMINISTRATOR")
        ) {
            return message
                .reply("Yavaş ol, bir yönetici kendi sunucusundan atılamaz!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const reason = args.slice(1).join(" ") || null;
        const memberId = args[0];
        const taggedUser = message.guild.members.cache.find(
            (m) => m.id == memberId
        );

        try {
            taggedUser.kick(reason);
            if (reason) {
                return message.channel
                    .send(
                        `<@${taggedUser.id}> sunucudan başarıyla **atıldı!**\n**Sebebi:** ${reason}`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } else {
                return message.channel
                    .send(`<@${taggedUser.id}> sunucudan başarıyla **atıldı!**`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        } catch (error) {
            if (error) {
                console.error(error);
                message.channel
                    .send(
                        `<@${taggedUser.id}> sunucudan atılırken bir **hata oluştu.**`
                    )
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        }
    }
};
