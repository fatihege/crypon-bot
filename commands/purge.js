const translate = require('../language/translate');

module.exports = {
	name: 'purge',
	description: null,
	aliases: ['clip', 'clear', 'kes', 'temizle'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	run(message, args, client) {
        this.description = translate(message, "commands.purge.description");
        this.usage = translate(message, "commands.purge.usage");

		let amount = parseInt(args[0]);
		if (isNaN(amount)) {
			return message
				.reply(translate(message, "commands.purge.messages.argMustBeNumber", args[0]))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				})
				.catch((err) => {
					console.error(err);
				});
		} else if (amount < 1 || amount > 100) {
			return message
				.reply(translate(message, "commands.purge.messages.argLimit"))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			return message.channel.bulkDelete(amount)
				.catch((err) => {
					console.error(err);
				});
		}
	},
};
