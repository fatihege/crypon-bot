module.exports = {
    name: "mdel",
    description: "Belirttiğiniz sayı kadar mesajı silin.",
    aliases: ["messagedelete", "mdelete", "msil", "mesajsil"],
    args: true,
    usage: "<count[int]>",
    guildOnly: true,
    permissions: "MANAGE_MESSAGES",
    run(message, args, client) {
        const amount = parseInt(args[0]);
        if (isNaN(amount)) {
            return message
                .reply(
                    `Girilen değer bir sayı olmalı! ${amount} bir sayı değil.`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (amount < 2 || amount > 100) {
            return message
                .reply("Silinecek mesaj sayısı 2 ile 100 arasında olmalıdır!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        message.delete();
        message.channel.bulkDelete(amount);
    }
};
