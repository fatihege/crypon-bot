const db = require("wio.db");
const translate = require("../language/translate");

module.exports = {
    name: "message",
    once: false,
    async run(message, client) {
        var prefix;
        if (message.guild && message.guild.available === true) {
            let guildId = client.guilds.cache.get(message.guild.id).id;
            if (await db.fetch(`prefix_${guildId}`)) {
                prefix = await db.fetch(`prefix_${guildId}`);
            } else {
                prefix = "!c";
            }

            if (
                message.content.toLowerCase().trim().toString() === "chelp" ||
                message.content.toLowerCase().trim().toString() === "prefix" ||
                message.content.toLowerCase().trim().toString() === `<@!${client.user.id}>`
            ) {
                return message.channel.send(translate(message, "basic.prefixMessage", prefix));
            }
        }

        if (message.channel.type == "dm") {
            await db.set("prefix_dm_" + message.channel.id, "!c");
            prefix = await db.fetch("prefix_dm_" + message.channel.id);
        }

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if (!command) return;

        if (command.guildOnly && message.channel.type == "dm") {
            if (message.channel && !await db.fetch("lang_dm_" + message.channel.id)) {
                await db.set("lang_dm_" + message.channel.id, "tr");
            }
            return message.reply(translate(message, "basic.cannotUsePrivateMessages"));
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.channel.send(translate(message, "basic.notPermission", message.author.id))
                    .then((msg) => {
                        msg.delete({
                            timeout: 7000
                        });
                    });
            }
        }

        if (command.args && !args.length) {
            let reply = translate(message, "basic.plaseGiveArg", message.author.id);
            if (command.usage) {
                reply += translate(message, "basic.thisCommandUsage", prefix, command.name, command.usage)
            }
            return message.channel.send(reply)
                .then((msg) => {
                    msg.delete({
                        timeout: 7000
                    });
                });
        }

        try {
            command.run(message, args, client);
        } catch (error) {
            console.error(error);
            message.channel.send(translate(message, "basic.errorOccurred"))
                .then((msg) => {
                    msg.delete({
                        timeout: 7000
                    });
                });
        }
    }
}
