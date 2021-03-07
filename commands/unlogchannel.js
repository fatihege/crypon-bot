const db = require("wio.db");

module.exports = {
    name: "unlogchannel",
    description: "Daha önceden seçilen günlük kaydı kanalını silin.",
    aliases: ["unlogch", "gunlukkanalisil"],
    args: false,
    usage: null,
    guildOnly: true,
    permissions: "MANAGE_CHANNEL",
    async run(message, args, client) {
        if (message.guild && (await db.fetch("logch_" + message.guild.id))) {
            try {
                await db.delete("logch_" + message.guild.id);
                message.channel
                    .send("Günlük kaydı kanalı başarıyla silindi!")
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } catch (err) {
                message.channel
                    .send("Bir hata ile karşılaşıldı.")
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            }
        } else {
            message.channel
                .send("Günlük kaydı kanalı zaten daha önceden seçilmemiş.")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
    }
};
