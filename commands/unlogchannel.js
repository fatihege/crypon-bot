const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'unlogchannel',
	description: null,
	aliases: ['unlogch', 'gunlukkanalisil'],
	args: false,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_CHANNEL',
	async run(message, args, client) {
		this.description = translate(message, 'commands.unlogchannel.description');
		this.usage = translate(message, 'commands.unlogchannel.usage');

		if (message.guild && (await db.fetch('logch_' + message.guild.id))) {
			try {
				await db.delete('logch_' + message.guild.id);
				message.channel.send(translate(message, 'commands.unlogchannel.messages.successful')).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			} catch (err) {
				message.channel.send(translate(message, 'commands.unlogchannel.messages.errorOccurred')).then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			}
		} else {
			message.channel
				.send(translate(message, 'commands.unlogchannel.messages.channelNotSelected'))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}
	},
};
