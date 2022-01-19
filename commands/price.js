const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("solana")
        .setDescription("returns current price of Solana"),
    async execute(interaction) {
        try{
            let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana'
            response = await fetch(url).then(response => response.json())
            price = response[0].current_price
            rank = response[0].market_cap_rank
            change = Math.round(response[0].price_change_percentage_24h * 100) / 100
            
            if(change > 0){
                color = '#00FF00'
            } else {
                color = '#FF0000'
            }

            const solanaPriceEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle('**Syndicate**')
                .setDescription(`**Here are the market Data for Solana**
                \n ** > Price:  ** $${price}
                \n ** > Rank:   ** ${rank}
                \n ** 24 Hour Change:   ** ${change}%
                `)
                .setTimestamp()

            interaction.reply({
                embeds: [solanaPriceEmbed]
            })

        } catch(err){
            console.error(err)
            interaction.reply({
                content: "Sorry an internal error occured",
                ephemeral: true
            })
        }
    }
}