const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("returns a list of commands"),
    async execute(interaction) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#e11f95")
        .setTitle("**Solana Helper v 0.0.1**")
        .setDescription(`**Here a list of commands** 
        \n ** > /ping ** check to see if the bot is working and live
        \n ** > /stats ** type the NFT collection to see the stats
        \n stay tuned for future updates`)
        .setTimestamp();

        interaction.reply({
            embeds: [helpEmbed],
        })
    }
}