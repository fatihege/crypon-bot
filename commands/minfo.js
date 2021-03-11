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
    name: "minfo",
    description: "Kendinizin veya başka bir üyenin bilgilerini görün.",
    aliases: ["memberinfo", "uyebilgi", "ubilgi"],
    args: false,
    usage: "<üye[opsiyonel]>",
    guildOnly: true,
    permissions: null,
    run(message, args, client) {
        let userid;
        if (message.mentions.users.size) {
            userid = message.mentions.users.first().id;
        } else {
            if (args.length) {
                userid = args[0];
            } else {
                userid = message.author.id;
            }
        }

        const user = message.guild.members.cache.find((m) => m.id == userid);

        if (!user) {
            return message.channel.send("Böyle bir üye yok!").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }

        if (userid == message.author.id) {
            const member = message.guild.members.cache.find(
                (m) => m.id == user.id
            ).user;
            const userRegisteredAt = dateFormat(
                member.createdAt,
                "d mmmm dddd yyyy, h.MM.ss TT"
            );
            const userJoinedAt = dateFormat(
                user.joinedAt,
                "d mmmm dddd yyyy, h.MM.ss TT"
            );
            let commandEmbed = {
                color: 0xe60ffa,
                thumbnail: {
                    url: user.user.displayAvatarURL({
                        format: "png",
                        dynamic: false
                    })
                },
                title: message.author.username + " Kullanıcısının Bilgileri",
                description: `**Kullanıcı adınız:** ${message.author.username}\n**ID:** ${message.author.id}\n**Hesap oluşturma:** ${userRegisteredAt}\n**Sunucuya katılma:** ${userJoinedAt}\n**Roller:** `
            };

            user.roles.cache.map((role) => {
                if (role.name[0] == "@") {
                    commandEmbed.description += role.name;
                } else {
                    commandEmbed.description += "<@&" + role.id + ">";
                }
            });

            message.channel.send({ embed: commandEmbed });
        } else {
            const member = message.guild.members.cache.find(
                (m) => m.id == user.id
            ).user;
            const userRegisteredAt = dateFormat(
                member.createdAt,
                "d mmmm dddd yyyy, h.MM.ss TT"
            );
            const userJoinedAt = dateFormat(
                user.joinedAt,
                "d mmmm dddd yyyy, h.MM.ss TT"
            );
            let commandEmbed = {
                color: 0xe60ffa,
                thumbnail: {
                    url: user.user.displayAvatarURL({
                        format: "png",
                        dynamic: false
                    })
                },
                title: user.user.username + " Kullanıcısının Bilgileri",
                description: `**Kullanıcı adı:** ${user.user.username}\n**ID:** ${user.id}\n**Hesap oluşturma:** ${userRegisteredAt}\n**Sunucuya katılma:** ${userJoinedAt}\n**Roller:** `
            };

            user.roles.cache.map((role) => {
                if (role.name[0] == "@") {
                    commandEmbed.description += role.name;
                } else {
                    commandEmbed.description += "<@&" + role.id + ">";
                }
            });

            message.channel.send({ embed: commandEmbed });
        }
    }
};
