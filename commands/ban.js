const db = require("wio.db");

module.exports = {
    name: "ban",
    description: "Bir üyeyi sunucudan engelleyin.",
    aliases: ["mban", "memberban", "uyeengelle", "uengelle"],
    args: true,
    usage: "<üye> <sebep[opsiyonel]>",
    guildOnly: true,
    permissions: "BAN_MEMBERS",
    async run(message, args, client) {
        let userid;
        if (message.mentions.users.size) {
            userid = message.mentions.users.first().id;
        } else {
            userid = args[0];
        }
        const user = message.guild.members.cache.find(
            (member) => member.id == userid
        );
        if (!user) {
            return message.reply("Böyle bir üye yok!").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }

        if (user.id == message.author.id) {
            return message
                .reply("Pişşt! Kendini engelleyemezsin.")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (user.id == client.user.id) {
            return message
                .reply("Hey sen! Beni bu komutu kullanarak engelleyemezsin.")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const prefix = await db.fetch("prefix_" + message.guild.id);
        const reason = args.slice(1).join(" ") || null;

        try {
            message.guild.members.ban(user, { reason: reason });
            if (reason) {
                message.channel
                    .send(`<@${user.id}> \`${reason}\` nedeniyle engellendi.`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } else {
                message.channel
                    .send(`<@${user.id}> başarıyla engellendi.`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        } catch (error) {
            console.error(error);
            message.channel
                .send(`<@${user.id}> engellenirken bir hata oluştu!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
    }
};
