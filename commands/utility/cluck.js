const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription("Replies with Cluck o'clock!"),
	async execute(interaction) {
		const date = new Date();
		const options = { hour: 'numeric', minute: 'numeric' };
		const localizedTime = date.toLocaleTimeString('en-US', options);
		await interaction.reply(`Right now, it's ${localizedTime}, but it's always Cluck o'clock!`);
	},
};
