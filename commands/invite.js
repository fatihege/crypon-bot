const translate = require('../language/translate');

module.exports = {
	name: 'invite',
	description: null,
	aliases: ['inv', 'davet'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, 'commands.invite.description');
		const messageEmbed = {
			color: 0xff14b9,
			author: {
				name: 'Crypon',
				icon_url: 'https://imgupload.io/images/2021/02/28/bot-avatar.png',
			},
			description: translate(message, 'commands.invite.messages.inviteEmbed'),
		};

		message.channel.send({ embed: messageEmbed });
	},
};
