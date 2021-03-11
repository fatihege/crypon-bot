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
            `Merhaba, ben ${botName}. Beni sunucuna davet etmeyi kabul ettiğiniz için teşekkür ederim. :heart:\n\nGünlük kaydı kanalını seçmek için: \`${prefix}logchannel <channel>\`\nKullanıcı karşılama kanalını seçmek için: \`${prefix}wlcchannel <channel>\`\nOtorol ayarlamak için: \`${prefix}setautorole <role>\`\nÖneki değiştirmek için: \`${prefix}sprefix <prefix>\`\nDetaylı bilgi almak için: \`${prefix}help <command[optional]>\`\n\nBotun kullanımını daha detaylı öğrenmek için: https://github.com/fatihege/crypon-bot/wiki\n\nDestek sunucusu: https://discord.gg/Xn3JRrbY8d\n\n**Not:** Hatasız çalışabilmem için \`Sunucu Ayarları > Roller\` bölümünden "${botName}" rolünün olabildiğince en yukarıya taşınması gerekiyor. Lütfen buna dikkat edin.`
        );
    }
};
