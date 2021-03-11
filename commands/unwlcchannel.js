const db = require("wio.db");

module.exports = {
    name: "unwlcchannel",
    description: "Daha önceden seçilen üyeleri karşılama kanalını silin.",
    aliases: ["unwlcch", "hosgeldinizkanalisil", "hgkanalisil"],
    args: false,
    usage: null,
    guildOnly: true,
    permissions: "MANAGE_CHANNEL",
    async run(message, args, client) {
			if (message.guild && await db.fetch("welcomech_" + message.guild.id)) {
				try {
					await db.delete("welcomech_" + message.guild.id);
					message.channel.send("Üyeleri karşılama kanalı başarıyla silindi!")
						.then((msg) => {
							msg.delete({ timeout: 5000 });
						});
				} catch (err) {
					message.channel.send("Bir hata ile karşılaşıldı.")
						.then((msg) => {
							msg.delete({ timeout: 5000 });
						});
				}
			} else {
				message.channel.send("Üyeleri karşılama kanalı zaten daha önceden seçilmemiş.")
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}
    }
}
