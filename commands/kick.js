const { botName } = require("../config.json");
const db = require("wio.db");

module.exports = {
    name: "kick",
    description: "Bir üyeyi sunucudan atın.",
    aliases: ["mkick", "uyeat"],
    args: true,
    usage: "<member> <reason>",
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    async run(message, args, client) {
        if (
            message.mentions.users.first().bot &&
            message.mentions.users.first().username == botName
        ) {
            return message
                .reply(`Hey sen! Beni bu komutla **atamazsın!**`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (!args.length || args.length < 2) {
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

        if (!message.mentions.members.first()) {
            return message
                .reply("Lütfen sunucudan atmak istediğin üyeyi etiketle!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (message.mentions.members.first().hasPermission("ADMINISTRATOR")) {
            return message
                .reply("Yavaş ol, bir yönetici kendi sunucusundan atılamaz!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const reason = args.slice(1).join(" ");
        const taggedUser = message.mentions.members.first();

        try {
            taggedUser.kick();
            message.channel.send(
                `${taggedUser} sunucudan başarıyla **atıldı!**\n**Sebebi:** ${reason}`
            );
        } catch (error) {
            if (error) {
                console.error(error);
                message.channel.send(
                    `${taggedUser} sunucudan atılırken bir **hata oluştu...**`
                );
            }
        }
    }
};
