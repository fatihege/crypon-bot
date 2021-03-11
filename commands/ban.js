const db = require("wio.db");

module.exports = {
    name: "ban",
    description: "Bir üyeyi sunucudan engelleyin.",
    aliases: ["mban", "memberban", "uyeengelle", "uengelle"],
    args: true,
    usage: "<member> <reason[optional]>",
    guildOnly: true,
    permissions: "BAN_MEMBERS",
    async run(message, args, client) {
        const user = args[0];

        if (user == message.author.id) {
            return message
                .reply("Pişşt! Kendini engelleyemezsin.")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (user == client.user.id) {
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
                    .send(`<@${user}> \`${reason}\` nedeniyle engellendi.`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } else {
                message.channel
                    .send(`<@${user}> başarıyla engellendi.`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        } catch (error) {
            console.error(error);
            message.channel
                .send(`<@${user}> engellenirken bir hata oluştu!`)
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
    }
};
