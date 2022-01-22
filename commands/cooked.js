const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfits = require('../models/profits')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cooked")
        .setDescription("add your profits to the database")
        .addStringOption(option => 
            option
            .setName("profit")
            .setDescription("the collection to check")
            .setRequired(true)),
    async execute(interaction) {
        today = new Date()
        today = today.getDate()
        id = interaction.user.id
        value =  (interaction.options._hoistedOptions[0].value)
        direction = value.charAt(0)
        amount = Number(value.substring(1))
        if(isNaN(amount)){
            interaction.reply({
                content: 'Please type the direction (+, - or blank) then the profit in sol. IE +1',
                ephemeral: true
            })
            return;
        }

        
        UserProfits.findOne({userId: id}, (err, profits) => {
            if (err){
                interaction.reply("An error occured when handling your request")
                return
            }
            if(!profits){
                if(direction === '+'){
                    profits = new UserProfits({
                    user_id: id,
                    total_profits: amount,
                    today_date: today,
                    today_profit: amount
                    })
                } else {
                    if(today === profits.today_date){
                        profits = new UserProfits({
                            user_id: id,
                            total_profits: value,
                            today_date: today,
                            today_profit: profits.today_profit + amount,
                        })
                    } else{
                        profits = new UserProfits({
                        user_id: id,
                        total_profits: value,
                        today_date: today,
                        today_profit: amount
                    })
                    }
                }
            } else {
                totalUserProfits = profits.total_profits
                if(today === profits.today_date){
                    if(direction === '+' || direction === '0'){
                        totalUserProfits = totalUserProfits + amount
                        profits.total_profits = totalUserProfits
                        profits.today_profit = profits.today_profit + amount
                        profits.today_date = today
                    } else {
                        totalUserProfits = totalUserProfits - amount
                        profits.total_profits = totalUserProfits
                        profits.today_profit = profits.today_profit - amount
                        profits.today_date = today
                    }
                } else {
                    if(direction === '+' || direction === '0'){
                        totalUserProfits = totalUserProfits + amount
                        profits.total_profits = totalUserProfits
                        profits.today_profit = amount
                        profits.today_date = today
                    } else {
                        totalUserProfits = totalUserProfits - amount
                        profits.total_profits = totalUserProfits
                        profits.today_profit = 0 - amount
                        profits.today_date = today
                    }
                }
            }

            profits.save(err => {
                if(err){
                    console.log('there was an error committing to db')
                }
                const userCooksEmbed = new Discord.MessageEmbed()
                    .setColor("#e11f95")
                    .setAuthor({name: 'Syndicate', iconURL: 'https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg'})
                    .setTitle("**Syndicate Profit Tracker**")
                    .addFields(
                        {name: 'Your Profits', value: `${profits.total_profits} SOL`, inline: true},
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/933204859728068608/933204908734312518/syndicate_logo.jpg')
                    .setTimestamp();
    
                interaction.reply({
                    embeds: [userCooksEmbed]
                })
            })
        })
    }
}