const fs = require('fs');
const translate = require('../language/translate');

module.exports = {
	name: 'reload',
	description: null,
	aliases: ['cmdreload', 'commandreload', 'yenidenyukle'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	run(message, args, client) {
        this.description = translate(message, "commands.reload.description");
        this.usage = translate(message, "commands.reload.usage");

		const commandName = args[0].toLowerCase();
		const command =
			message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)) ||
			message.client.commands.get(commandName);

		if (!command) {
			return message.channel.send(translate(message, 'commands.reload.messages.commandNotFound'));
		}

		const commandFiles = fs.readdirSync('./commands');
		const fileName = commandFiles.find((file) => fs.readFileSync(`./commands/${file}`));

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel
				.send(translate(message, "commands.reload.messages.successful", command.name))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				})
				.catch((err) => {
					console.error(err);
				});
		} catch (error) {
			console.error(error);
			message.channel.send(
				translate(message, "commands.reload.messages.errorOccurred", command.name)
			);
		}
	},
};
