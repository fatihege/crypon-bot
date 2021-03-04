const db = require("wio.db");

module.exports = {
    name: "setautorole",
    description: "Sunucuya katılan üyelere verilecek olan birincil rolü seçin.",
    aliases: ["setarole", "orolayarla", "otorolayarla"],
    args: true,
    usage: "<role>",
    guildOnly: true,
    permissions: "MANAGE_MESSAGES",
    async run(message, args, client) {
        if (!message.mentions.roles.first()) {
            message.reply("Lütfen otomatik eklenecek rolü seç!")
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const autorole = message.mentions.roles.first();

        try {
            await db.set("autorole_" + message.guild.id, autorole.id);
            message.channel.send(`Otomatik rol başarıyla ${autorole} olarak ayarlandı.`)
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel.send("Otomatik rol ayarlanırken bir hatayla karşılaşıyorum.");
        }
    }
}