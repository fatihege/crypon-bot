const db = require("wio.db");

module.exports = {
    name: "logchannel",
    description: "Sunucuda olup bitenlerin kaydını tutacağınız kanalı seçin.",
    aliases: ["logch", "setlogch", "logkanali", "gunlukkanali"],
    args: true,
    usage: "<kanal>",
    guildOnly: true,
    permissions: "MANAGE_CHANNEL",
    async run(message, args, client) {
        if (!message.mentions.channels.first()) {
            message
                .reply("Lütfen günlük kaydını tutacağım kanalı seç!")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }

        const logch = message.mentions.channels.first();

        try {
            await db.set("logch_" + message.guild.id, logch.id);
            message.channel
                .send(
                    `Günlük kaydı kanalı başarıyla ${logch} olarak ayarlandı.`
                )
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        } catch (error) {
            console.error(error);
            message.channel.send(
                "Günlük kaydı kanalı ayarlanırken bir hatayla karşılaşıyorum."
            );
        }
    }
};
