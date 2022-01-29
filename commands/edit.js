const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfits = require('../models/profits')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("edit")
        .setDescription("edit the last entry")
        .addStringOption(option => 
            option
            .setName("profit")
            .setDescription("change the last entry to this profit")
            .setRequired(true)),
    async execute(interaction) {
        today = new Date()
        today = today.getDate()
        id = interaction.user.id
        value =  (interaction.options._hoistedOptions[0].value)
        direction = value.charAt(0)
        amount = Number(value.substring(1))
        UserProfits.findOne({userId: id}, (err, profits) => {
            if(err){
                interaction.reply({
                    content: 'hmm seems like you may not be in our system... /cooked and start tracking your profits',
                    ephemeral: true
                })
            }
            profits.today_date = today
            if(profits.last_entry == undefined){
                if(err){
                    interaction.reply({
                        content: 'hmm seems like you may not be in our system... /cooked and start tracking your profits',
                        ephemeral: true
                    })
                }
            }
            else{
                lastEntry = profits.last_entry
                if(profits.last_entry > 0){
                    profits.total_profits = profits.total_profits - lastEntry
                }
                else{
                    profits.total_profits = profits.total_profits + lastEntry
                }
            }
            console.log(direction)
            if(direction === '+'){
                profits.total_profits = profits.total_profits + amount
                profits.last_entry = amount
            }
            else {
                profits.total_profits = profits.total_profits - amount
                profits.last_entry = value
            }

            profits.save(err => {
                if(err){
                    console.log('there was an error committing to db')
                }
                const userEdit = new Discord.MessageEmbed()
                    .setColor("#e11f95")
                    .setAuthor({name: 'Syndicate', iconURL: 'https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg'})
                    .setTitle("**Syndicate Profit Tracker**")
                    .addFields(
                        {name: 'Your New Profits', value: `${profits.total_profits} SOL`, inline: true},
                        {name: 'You changed your last entry', value: `${lastEntry} to ${profits.last_entry} SOL`, inline: true}
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg')
                    .setTimestamp();
    
                interaction.reply({
                    embeds: [userEdit]
                })
            })
        })
    }
}