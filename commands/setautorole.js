const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'setautorole',
	description: null,
	aliases: ['setarole', 'orolayarla', 'otorolayarla'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async run(message, args, client) {
		this.description = translate(message, 'commands.setautorole.description');
		this.usage = translate(message, 'commands.setautorole.usage');

		if (!message.mentions.roles.first()) {
			message.reply(translate(message, 'commands.setautorole.messages.selectRole')).then((msg) => {
				msg.delete({ timeout: 7000 });
			});
		}

		const autorole = message.mentions.roles.first();

		try {
			await db.set('autorole_' + message.guild.id, autorole.id);
			return message.channel
				.send(translate(message, 'commands.setautorole.messages.successful', autorole))
				.then((msg) => {
					msg.delete({ timeout: 7000 });
				});
		} catch (error) {
			console.error(error);
			return message.channel.send(translate(message, "commands.setautorole.messages.errorOccurred"))
                .then((msg) => {
                    msg.delete({ timeout: 7000 });
                });
		}
	},
};
