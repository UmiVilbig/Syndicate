const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("returns a list of commands"),
    async execute(interaction) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#e11f95")
        .setTitle("**Syndicate**")
        .setDescription(`**Here a list of commands** 
        \n ** > /ping ** check to see if the bot is working and live
        \n ** > /solana ** returns the price and performance of Solana
        \n ** > /cooked  ** track your profits (+, -, or blank) and profit in sol ie. (+1)
        \n ** > /profit ** see your profits
        \n stay tuned for future updates`)
        .setTimestamp();

        interaction.reply({
            embeds: [helpEmbed],
        })
    }
}