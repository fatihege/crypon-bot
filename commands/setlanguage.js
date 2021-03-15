const translate = require('../language/translate');
const db = require('wio.db');
const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = {
	name: 'setlanguage',
	description: null,
	aliases: ['setlang', 'dilayarla'],
	args: true,
	usage: null,
	guildOnly: false,
	permissions: 'MANAGE_GUILD',
	async run(message, args, client) {
		this.description = translate(message, 'commands.setlanguage.description');
		this.usage = translate(
			message,
			'commands.setlanguage.usage',
			readdirSync(join(__dirname, '../', 'languages'))
				.filter((file) => file.endsWith('.json').toString())
				.join('|')
				.toString()
				.replace(/\.json/gi, '')
		);

		if (args.length > 1) {
			return message.reply(translate(message, 'commands.setlanguage.messages.maxArgs')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		const isExists = readdirSync(join(__dirname, '../', 'languages')).find((file) => file == `${args[0]}.json`);
		if (!isExists) {
			return message.channel
				.send(translate(message, 'commands.setlanguage.messages.langNotExists'))
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		}

		if (message.channel.type == 'dm') {
			await db.set('lang_dm_' + message.channel.id, args[0]);
			return message.channel.send(translate(message, 'commands.setlanguage.messages.successful')).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}

		await db.set('lang_' + message.guild.id, args[0]);
		return message.channel.send(translate(message, 'commands.setlanguage.messages.successful')).then((msg) => {
			msg.delete({ timeout: 5000 });
		});
	},
};
