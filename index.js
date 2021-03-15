const keep_alive = require('./keep_alive.js');
const { token } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args, client));
	} else {
		client.on(event.name, (...args) => event.run(...args, client));
	}
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(token);
