const db = require("wio.db");

module.exports = {
    name: "unsetautorole",
    description: "Otomatik rol etkinliğini kaldırın.",
    aliases: ["unsetarole", "orolsil", "otorolsil"],
    args: false,
    usage: null,
    guildOnly: true,
    permissions: "MANAGE_ROLES",
    async run(message, args, client) {
        if (await db.fetch("autorole_" + message.guild.id)) {
            try {
                await db.delete("autorole_" + message.guild.id);
                return message.channel
                    .send(`Otomatik rol etkinliği başarıyla kaldırıldı.`)
                    .then((msg) => {
                        msg.delete({ timeout: 5000 });
                    });
            } catch (error) {
                console.error(error);
                return message.channel.send(
                    "Otomatik rol kaldırılırken bir hatayla karşılaşıyorum."
                );
            }
        } else {
            return message.channel
                .send("Otomatik rol zaten daha önceden ayarlanmamış.")
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
        }
    }
};
