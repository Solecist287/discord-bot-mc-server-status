const { SlashCommandBuilder, InteractionContextType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roost')
		.setDescription("Makes a member roost around the coop")
        .addUserOption((option) =>
			option
				.setName('target')
				.setDescription('The member to roost')
				.setRequired(true)
        )
        .setContexts(InteractionContextType.Guild),
	async execute(interaction) {
        const target = interaction.options.getUser('target');
        console.log(interaction);
        console.log(interaction.guild);
        // interaction.guild.channels.filter((c) => c.type === 'voice').forEach((ch) => console.log(ch));
	},
};
