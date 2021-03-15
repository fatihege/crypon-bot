const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'wlcchannel',
	description: null,
	aliases: ['wlcch', 'welcomech', 'welcomechannel', 'hgkanali', 'hosgeldinizkanali'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'MANAGE_CHANNELS',
	async run(message, args, client) {
		this.description = translate(message, 'commands.wlcchannel.description');
		this.usage = translate(message, 'commands.wlcchannel.usage');

		if (!message.mentions.channels.first()) {
			message.reply(translate(message, 'commands.wlcchannel.messages.selectChannel')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		if (message.mentions.channels.first().type != 'text') {
			return message.reply(translate(message, 'commands.wlcchannel.messages.channelIsText')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const welcomech = message.mentions.channels.first();

		if (message.guild) {
			try {
				await db.set('welcomech_' + message.guild.id, welcomech.id);
				message.channel
					.send(translate(message, "commands.wlcchannel.messages.successful", welcomech.id))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			} catch (error) {
				console.error(error);
				return message.channel
					.send(translate(message, "commands.wlcchannel.messages.errorOccurred"))
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}
		}
	},
};
