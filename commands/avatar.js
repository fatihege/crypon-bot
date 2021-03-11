module.exports = {
    name: "avatar",
    description: "Kendinizin veya başka bir üyenin avatarını görün.",
    aliases: ["uavatar", "mavatar"],
    args: false,
    usage: "<üye[opsiyonel]>",
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        if (!message.mentions.users.size && args.length < 1) {
            const commandEmbed = {
                color: 0xe60ffa,
                title: "Kullanıcı Avatarı",
                description: message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                    size: 1024
                }),
                image: {
                    url: message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 1024
                    })
                }
            };
            return message.channel.send({ embed: commandEmbed });
        }

        let userid;
        if (message.mentions.users.size) {
            userid = message.mentions.users.first().id;
        } else {
            userid = args[0];
        }

        const user = message.guild.members.cache.find((m) => m.id == userid);

        if (!user) {
            return message.channel.send("Böyle bir üye yok!").then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        }

        if (message.author.username == user.username) {
            const commandEmbed = {
                color: 0xe60ffa,
                title: "Kullanıcı Avatarı",
                description: message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                    size: 1024
                }),
                image: {
                    url: message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 1024
                    })
                }
            };
            return message.channel.send({ embed: commandEmbed });
        } else {
            const commandEmbed = {
                color: 0xe60ffa,
                title: user.user.username + " Kullanıcısının Avatarı",
                description: user.user.displayAvatarURL({
                    format: "png",
                    dynamic: true,
                    size: 1024
                }),
                image: {
                    url: user.user.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 1024
                    })
                }
            };
            return message.channel.send({ embed: commandEmbed });
        }
    }
};
