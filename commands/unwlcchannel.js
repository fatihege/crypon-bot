const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'unwlcchannel',
	description: null,
	aliases: ['unwlcch', 'hosgeldinizkanalisil', 'hgkanalisil'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_CHANNEL',
	async run(message, args, client) {
		this.description = translate(message, 'commands.unwlcchannel.description');
		this.usage = translate(message, 'commands.unwlcchannel.usage');

		if (message.guild && (await db.fetch('welcomech_' + message.guild.id))) {
			try {
				await db.delete('welcomech_' + message.guild.id);
				message.channel.send(translate(message, 'commands.unwlcchannel.messages.successful')).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			} catch (err) {
				message.channel.send(translate(message, 'commands.unwlcchannel.messages.errorOccurred')).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			}
		} else {
			message.channel.send(translate(message, "commands.unwlcchannel.messages.channelNotSelected")).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
	},
};
