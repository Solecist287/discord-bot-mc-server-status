const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, guildId, channelId } = require('./config.json');

const https = require('https');

// Create a new client instance
function postIpOnDiscord(ip) {
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// When the client is ready, run this code (only once).
	// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
	// It makes some properties non-nullable.
	client.once(Events.ClientReady, readyClient => {
		console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	});

	// Log in to Discord with your client's token
	client.login(token);

	client.on('ready', () => {
		console.log("I am ready");
		var guild = client.guilds.cache.get(guildId);
		
		if(guild && guild.channels.cache.get(channelId)){
			const serverMessage = `Cockadoodle doo! Word around the farm is that the server IP has changed! \n\nNew IP: ${ip}\nPort: 25565\n\nSee you there!`;
			console.log(serverMessage);
			guild.channels.cache.get(channelId).send(serverMessage).then(() => client.destroy());
		} else {
			console.log("error");
			//if the bot doesn't have guild with the id guildid
			// or if the guild doesn't have the channel with id channelid
		}
		client.destroy();
	});
}
function getIpAddress() {
	return new Promise((resolve, reject) => {
		https.get('https://api.ipify.org', (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				resolve(data);
			});
		}).on('error', (err) => {
			reject(`Error: ${err.message}`);
		});
	});
}
getIpAddress().then(ip => {
	// open file to see last saved ip
	const filePath = path.join(__dirname, 'saved-ip.txt');
	let savedIp = null;
	if (fs.existsSync(filePath)) {
		savedIp = fs.readFileSync(filePath, 'utf8').trim();
	}
	// if ip is the same, exit
	if (ip === savedIp) {
		console.log("IP is the same, exiting");
		process.exit(0);
	} else {
		// save new ip to file
		fs.writeFileSync(filePath, ip, 'utf8');
	}
	// create discord client, post new ip, destroy itself
	postIpOnDiscord(ip);
}
).catch(err => {
	console.log(err);
});