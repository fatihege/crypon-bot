const fetch = require('node-fetch');
const translate = require('../language/translate');

module.exports = {
	name: 'random',
	description: null,
	aliases: ['rastgele'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	async run(message, args, client) {
		this.description = translate(message, 'commands.random.description');
		this.usage = translate(message, 'commands.random.usage');

		const arg = args[0].toLowerCase();

		let category;
		if (arg == 'panda') {
			category = 'panda';
		} else if (arg == 'dog' || arg == 'köpek' || arg == 'kopek') {
			category = 'dog';
		} else {
			category = 'cat';
		}
		const { link } = await fetch(`https://some-random-api.ml/img/${category}`).then((response) => response.json());
		return message.channel.send(translate(message, 'commands.random.messages.fetchingImage')).then((msg) => {
			if (link) {
				msg.edit(link);
			}
		});
	},
};
