module.exports = {
    name: "avatar",
    description: "Kendinizin veya başka bir üyenin avatarını görün.",
    aliases: ["uavatar", "mavatar"],
    args: false,
    usage: "<member[optional]>",
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        if (!message.mentions.users.size && args.length) {
            return message.reply("Böyle bir üye yok!");
        } else if (!message.mentions.users.size) {
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
        const avatarList = message.mentions.users.map((user) => {
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
                    title: user.username + " Kullanıcısının Avatarı",
                    description: user.displayAvatarURL({
                        format: "png",
                        dynamic: true,
                        size: 1024
                    }),
                    image: {
                        url: user.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                            size: 1024
                        })
                    }
                };
                return message.channel.send({ embed: commandEmbed });
            }
        });
    }
};
