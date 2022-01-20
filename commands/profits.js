const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfits = require('../models/profits')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profit")
        .setDescription("see your profits"),
        async execute(interaction) {
            id = interaction.user.id
            UserProfits.findOne({userId: id}, (err, profits) => {
                if(err){
                    interaction.reply({
                        content: 'It seems like you are not in our records... type /cooked and add your profits',
                        ephemeral: true
                    })
                }
                if(profits.total_profits > 0){
                    color = '#00FF00'
                } else {
                    color = '#FF0000'
                }
                const userProfitEmbed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setAuthor({name: 'Syndicate', iconURL: 'https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg'})
                    .setTitle("**Syndicate Profit Tracker**")
                    .addFields(
                        {name: 'Your Profits', value: `${profits.total_profits} SOL`, inline: true},
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg')
                    .setTimestamp();
    
                interaction.reply({
                    embeds: [userProfitEmbed]
                })
            })
        }
}