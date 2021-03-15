const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'logchannel',
	description: null,
	aliases: ['logch', 'setlogch', 'logkanali', 'gunlukkanali'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_CHANNEL',
	async run(message, args, client) {
		this.description = translate(message, 'commands.logchannel.description');
		this.usage = translate(message, 'commands.logchannel.usage');

		if (!message.mentions.channels.first()) {
			message.reply(translate(message, 'commands.logchannel.messages.selectChannel')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const logch = message.mentions.channels.first();

		try {
			await db.set('logch_' + message.guild.id, logch.id);
			message.channel.send(translate(message, 'commands.logchannel.messages.successful', logch)).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		} catch (error) {
			console.error(error);
			message.channel.send(translate(message, 'commands.logchannel.messages.errorOccurred'));
		}
	},
};
