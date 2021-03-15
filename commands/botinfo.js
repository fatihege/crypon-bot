const { version } = require('../package.json');
const os = require('os');
const byteSize = require('byte-size');
const pretty = require('pretty-ms');
const translate = require('../language/translate');

module.exports = {
	name: 'botinfo',
	description: null,
	aliases: ['botbilgi'],
	args: false,
	usage: null,
	guildOnly: false,
	permissions: null,
	run(message, args, client) {
		this.description = translate(message, 'commands.botinfo.description');
		this.usage = translate(message, 'commands.botinfo.usage');

		const botUptime = pretty(client.uptime)
			.toString()
			.replace(/y/gi, ` ${translate(message, 'basic.date.year')}`)
			.replace(/d/gi, ` ${translate(message, 'basic.date.day')}`)
			.replace(/h/gi, ` ${translate(message, 'basic.date.hour')}`)
			.replace(/m/gi, ` ${translate(message, 'basic.date.minute')}`)
			.replace(/s$/gi, ` ${translate(message, 'basic.date.second')}`);

		const platform = os.platform();
		const typeAndArch = `${os.type()} ${os.arch()}`;
		const osVersion = os.version();
		const fullOS = `${platform} (${typeAndArch}) - ${osVersion}`;

		const osUptime = pretty(os.uptime())
			.toString()
			.replace(/y/gi, ` ${translate(message, 'basic.date.year')}`)
			.replace(/d/gi, ` ${translate(message, 'basic.date.day')}`)
			.replace(/h/gi, ` ${translate(message, 'basic.date.hour')}`)
			.replace(/m/gi, ` ${translate(message, 'basic.date.minute')}`)
			.replace(/s$/gi, ` ${translate(message, 'basic.date.second')}`);

		const nodeVersion = process.versions.node;
		const discordJsVersion = require('discord.js').version;
		const botVersion = `v${version}`;

		const totalMemoryConv = byteSize(os.totalmem());
		const totalMemory = `${totalMemoryConv.value}${totalMemoryConv.unit.toString().toUpperCase()}`;

		const memoryUsageConv = byteSize(process.memoryUsage().heapUsed);
		const memoryUsage = `${memoryUsageConv.value}${memoryUsageConv.unit.toString().toUpperCase()}`;

		const freeMemoryConv = byteSize(os.totalmem() - os.freemem());
		const freeMemory = `${freeMemoryConv.value}${freeMemoryConv.unit.toString().toUpperCase()}`;

		const cpuModel = os.cpus()[0].model;
		const cpuSpeed = `${os.cpus()[0].speed}GHz`;
		const cpuCores = os.cpus().length;

		const embed = {
			color: 0xe60ffa,
			title: translate(message, 'commands.botinfo.messages.cryponBotInfo'),
			fields: [
				{
					name: translate(message, 'commands.botinfo.messages.botsUptime'),
					value: botUptime,
				},
				{
					name: translate(message, 'commands.botinfo.messages.os'),
					value: fullOS,
				},
				{
					name: translate(message, 'commands.botinfo.messages.versions'),
					value: translate(
						message,
						'commands.botinfo.messages.versionsValue',
						botVersion,
						nodeVersion,
						discordJsVersion
					),
				},
				{
					name: translate(message, 'commands.botinfo.messages.memory'),
					value: translate(
						message,
						'commands.botinfo.messages.memoryValue',
						totalMemory,
						memoryUsage,
						freeMemory
					),
					inline: true,
				},
				{
					name: translate(message, 'commands.botinfo.messages.cpu'),
					value: translate(message, 'commands.botinfo.messages.cpuValue', cpuModel, cpuSpeed, cpuCores),
					inline: true,
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'Crypon - Fatih EGE',
			},
		};
		message.channel.send({ embed: embed });
	},
};
