const { botName } = require("../config.json");
const db = require("wio.db");

module.exports = {
    name: "guildCreate",
    once: false,
    async run(guild) {
        await db.set("prefix_" + guild.id, "!c");
        const prefix = await db.fetch("prefix_" + guild.id);
        const channel = guild.channels.cache
            .filter((c) => c.type == "text")
            .find((ch) => ch.position == 0);
        const admin = guild.members.cache.find((m) =>
            m.hasPermission("ADMINISTRATOR")
        );
        channel.send(
            `Merhaba, ben ${botName}. Beni sunucuna davet etmeyi kabul ettiğin için teşekkür ederim ${admin}. :heart:\n\nGünlük kaydı kanalını seçmek için: \`${prefix}logchannel <channel>\`\nKullanıcı karşılama kanalını seçmek için: \`${prefix}wlcchannel <channel>\`\nOtorol ayarlamak için: \`${prefix}setautorole <role>\`\nÖneki değiştirmek için: \`${prefix}sprefix <prefix>\`\n\nDestek sunucusu: https://discord.gg/Xn3JRrbY8d`
        );
    }
};
