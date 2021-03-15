const db = require('wio.db');
const translate = require('../language/translate');

module.exports = {
	name: 'setnickname',
	description: null,
	aliases: ['setnick', 'takmaad'],
	args: true,
	usage: null,
	guildOnly: true,
	permissions: 'CHANGE_NICKNAME',
	async run(message, args, client) {
		this.description = translate(message, 'commands.setnickname.description');
		this.usage = translate(message, 'commands.setnickname.usage');

		if (!args.length || args.length < 2) {
			return message.reply(translate(message, 'commands.setnickname.messages.maxArgs')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		let memberid = args[0];

		var nick = args
			.join(' ')
			.split(memberid + ' ')
			.toString()
			.trim()
			.replace(',', '')
			.replace(memberid, '');
		let member = message.guild.members.cache.find((member) => member.id == memberid);

		if (!member) {
			const prefix = await db.fetch('prefix_' + message.guild.id);
			return message.channel
				.send(
					translate(
						message,
						'commands.setnickname.messages.memberNotExists',
						memberid,
						prefix,
						this.name,
						this.usage
					)
				)
				.then((msg) => {
					msg.delete({ timeout: 10000 });
				});
		}

		if (!nick || nick.trim() == '') {
			return message.reply(translate(message, "commands.setnickname.messages.enterNickname"));
		}

		try {
			member.setNickname(nick);
			message.channel
				.send(translate(message, "commands.setnickname.messages.successful", member.id, nick))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		} catch (error) {
			console.error(error);
			message.channel.send(translate(message, "commands.setnickname.messages.errorOccurred"));
		}
	},
};
