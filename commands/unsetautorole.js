const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'unsetautorole',
	description: null,
	aliases: ['unsetarole', 'orolsil', 'otorolsil'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async run(message, args, client) {
		this.description = translate(message, 'commands.unsetautorole.description');
		this.usage = translate(message, 'commands.unsetautorole.usage');

		if (await db.fetch('autorole_' + message.guild.id)) {
			try {
				await db.delete('autorole_' + message.guild.id);
				return message.channel
					.send(translate(message, 'commands.unsetautorole.messages.successful'))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			} catch (error) {
				console.error(error);
				return message.channel
					.send(translate(message, 'commands.unsetautorole.messages.errorOccurred'))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}
		} else {
			return message.channel
				.send(translate(message, 'commands.unsetautorole.messages.channelNotSelected'))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}
	},
};
