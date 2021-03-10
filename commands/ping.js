module.exports = {
    name: "ping",
    description: "Botun ping değerini öğrenin.",
    aliases: ["botping"],
    args: false,
    usage: null,
    guildOnly: false,
    permissions: null,
    run(message, args, client) {
        const pingEmbed = {
            color: 0xe60ffa,
            description: `Ping değerim: **${client.ws.ping} ms**`
        };

        message.channel.send({ embed: pingEmbed });
    }
};
