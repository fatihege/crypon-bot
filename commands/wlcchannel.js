const db = require("wio.db");

module.exports = {
    name: "wlcchannel",
    description: "Sunucuya katılan üyelerin karşılanacağı kanalı belirtin.",
    aliases: ["wlcch", "welcomech", "welcomechannel", "hgkanali", "hosgeldinizkanali"],
    args: true,
    usage: "<channel>",
    guildOnly: true,
    permissions: "MANAGE_CHANNELS",
    async run(message, args, client) {
        if (!message.mentions.channels.first()) {
            message.reply("Lütfen üyeleri karşılayacağım seç!")
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
        }

        if (message.mentions.channels.first().type != "text") {
            return message.reply("Üyeleri karşılayacağım kanal metin kanalı olmak zorunda!")
                .then(msg => {
                    msg.delete({ timeout: 5000});
                });
        }

        const welcomech = message.mentions.channels.first();

        if (message.guild) {
            try {
                await db.set("welcomech_" + message.guild.id, welcomech.id);
                message.channel.send(`Üyeleri karşılama kanalı başarıyla ${welcomech} olarak ayarlandı.`)
                    .then(msg => {
                        msg.delete({ timeout: 5000 });
                    });
            } catch (error) {
                console.error(error);
                message.channel.send("Üyelerin karşılanacağı kanal ayarlanırken bir hatayla karşılaşıyorum.");
            }
        } else {
            welcomech.send("Sunucu bilgisi alınamadı.");
        }
    }
}