const translate = require('../language/translate');

module.exports = {
	name: 'ping',
	description: null,
	aliases: ['botping'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, "commands.ping.description");
		this.usage = translate(message, "commands.ping.usage");

		const pingEmbed = {
			color: 0xe60ffa,
			description: `**${translate(message, "commands.ping.messages.pingValue")}:** ${client.ws.ping} ms`,
		};

		message.channel.send({ embed: pingEmbed });
	},
};
