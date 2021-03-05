const dateFormat = require("dateformat");
dateFormat.i18n = {
    dayNames: [
        "Pzr",
        "Pzt",
        "Sal",
        "Çrş",
        "Prş",
        "Cum",
        "Cmt",
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
    ],
    monthNames: [
        "Ock",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Hzn",
        "Tem",
        "Ağs",
        "Eyl",
        "Ekm",
        "Ksm",
        "Arl",
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ],
    timeNames: ["ö", "s", "öm", "ös", "Ö", "S", "ÖÖ", "ÖS"]
};
const db = require("wio.db");

module.exports = {
    name: "roleDelete",
    once: false,
    async run(role) {
        if (role.guild) {
            if (await db.fetch("logch_" + role.guild.id)) {
                const logChannel = await db.fetch("logch_" + role.guild.id);
                const logch = role.guild.channels.cache.find(
                    (ch) => ch.id === logChannel
                );

                let logEmbed = {
                    color: 0xe60ffa,
                    title: `Rol Silindi`,
                    description: `**Ad:** ${role.name}\n**Renk:** ${
                        role.hexColor
                    }\n**Bahsedilebilir:** ${
                        role.mentionable ? "Evet" : "Hayır"
                    }\n**Oluşturulma:** ${dateFormat(
                        role.createdAt,
                        "d mmmm dddd yyyy, h.MM.ss TT"
                    )}`
                };

                return logch.send({ embed: logEmbed });
            }
        }
    }
};
