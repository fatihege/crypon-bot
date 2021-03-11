module.exports = {
    name: "invite",
    description: "Botun davet linkini gönderir.",
    aliases: ["inv", "davet"],
    args: false,
    usage: null,
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        const messageEmbed = {
            color: 0xff14b9,
            title: "Botu Davet Et",
            description:
                "https://discord.com/oauth2/authorize?client_id=815184711416152094&scope=bot&permissions=8",
            footer: {
                text: "Fatih EGE",
                icon_url:
                    "https://imgupload.io/images/2021/02/28/bot-avatar.png"
            }
        };

        message.channel.send({ embed: messageEmbed });
    }
};
