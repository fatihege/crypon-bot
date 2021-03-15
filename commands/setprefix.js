const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'setprefix',
	description: null,
	aliases: ['sprefix', 'setpref', 'prefixayarla'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	async run(message, args, client) {
		this.description = translate(message, 'commands.setprefix.description');
		this.usage = translate(message, 'commands.setprefix.usage');

		try {
			await db.set('prefix_' + message.guild.id, args.join(' '));
			message.channel
				.send(translate(message, 'commands.setprefix.messages.successful', args.join(' ')))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		} catch (error) {
			console.error(error);
			return message.channel.send(translate(message, 'commands.setprefix.messages.errorOccurred'))
                .then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
		}
	},
};
