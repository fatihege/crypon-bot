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
        "Cumartesi",
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
        "Aralık",
    ],
    timeNames: ["ö", "s", "öm", "ös", "Ö", "S", "ÖÖ", "ÖS"],
};

module.exports = {
    name: "minfo",
    description: "Kendinizin veya başka bir üyenin bilgilerini görün.",
    aliases: ["memberinfo", "uyebilgi", "ubilgi"],
    args: false,
    usage: "<member[optional]>",
    guildOnly: true,
    permissions: null,
    run(message, args, client) {
        if (!message.mentions.users.first()) {
            const user = message.author;
            const member = message.member;
            const userRegisteredAt = dateFormat(user.createdAt, "d mmmm dddd yyyy, h.MM.ss TT");
            const userJoinedAt = dateFormat(member.joinedAt, "d mmmm dddd yyyy, h.MM.ss TT");
            let commandEmbed = {
                color: 0xe60ffa,
                title: message.author.username + " Kullanıcısının Bilgileri",
                description: `**Kullanıcı adınız:** ${message.author.username}\n**ID:** ${message.author.id}\n**Hesap oluşturma:** ${userRegisteredAt}\n**Sunucuya katılma:** ${userJoinedAt}\n**Roller:** `
            }
            member.roles.cache.map(role => {
                if (role.name[0] == "@") {
                    let r = message.guild.roles.cache.get(role.id).name;
                    commandEmbed.description += r + " ";
                } else {
                    let r = message.guild.roles.cache.get(role.id).name;
                    commandEmbed.description += "@" + r + " ";
                }
            });
            message.channel.send({ embed: commandEmbed });
        } else {
            const user = message.mentions.users.first();
            const member = message.mentions.members.first();
            const userRegisteredAt = dateFormat(user.createdAt, "d mmmm dddd yyyy, h.MM.ss TT");
            const userJoinedAt = dateFormat(member.joinedAt, "d mmmm dddd yyyy, h.MM.ss TT");
            let commandEmbed = {
                color: 0xe60ffa,
                title: user.username + " Kullanıcısının Bilgileri",
                description: `**Kullanıcı adı:** ${user.username}\n**ID:** ${user.id}\n**Hesap oluşturma:** ${userRegisteredAt}\n**Sunucuya katılma:** ${userJoinedAt}\n**Roller:** `
            }
            member.roles.cache.map(role => {
                if (role.name[0] == "@") {
                    let r = message.guild.roles.cache.get(role.id).name;
                    commandEmbed.description += r + " ";
                } else {
                    let r = message.guild.roles.cache.get(role.id).name;
                    commandEmbed.description += "@" + r + " ";
                }
            });
            message.channel.send({ embed: commandEmbed });
        }
    }
}