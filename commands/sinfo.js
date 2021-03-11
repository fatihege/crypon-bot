const { botName } = require("../config.json");
const db = require("wio.db");

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

module.exports = {
    name: "sinfo",
    description: "Sunucu bilgileri.",
    aliases: ["serverinfo", "sbilgi", "sunucubilgi"],
    args: false,
    usage: null,
    guildOnly: true,
    permissions: null,
    async run(message, args, client) {
        const server = message.guild;
        const serverCreatedAt = dateFormat(
            server.createdAt,
            "d mmmm dddd yyyy, h.MM.ss TT"
        );
        const guildRegion =
            server.region.charAt(0).toUpperCase() + server.region.slice(1);
        const commandembed = {
            color: 0xe60ffa,
            thumbnail: {
                url: server.iconURL({ format: "png", dynamic: false })
            },
            title: server.name + " Sunucusuna Dair Bilgiler",
            description: `**Sunucu ID:** ${server.id}\n**Sunucu Adı:** ${
                server.name
            }\n**Sunucu Sahibi:** ${server.owner.user.tag}\n**Toplam Üye:** ${
                server.memberCount
            }\n**Oluşturulma:** ${serverCreatedAt}\n**Bölge:** ${guildRegion}\n**AFK Zaman Aşımı:** ${
                server.afkTimeout / 60
            }\n**${botName} Prefix:** ${
                (await db.fetch("prefix_" + message.guild.id))
                    ? await db.fetch("prefix_" + message.guild.id)
                    : "!c"
            }`
        };
        message.channel.send({ embed: commandembed });
    }
};
