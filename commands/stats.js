const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Checks the volume")
        .addStringOption(option => 
            option
            .setName("collection")
            .setDescription("the collection to check")
            .setRequired(true)),
        async execute(interaction){
            let collection = interaction.options._hoistedOptions[0].value
            collection = collection.toLowerCase()
            let url = 'https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/' + collection.replace(' ', '_')
            try {
                response = await fetch(url).then(response => response.json());
                floorPrice = response.results.floorPrice / 1000000000
                volume = response.results.volume24hr / 1000000000
                listedCount = response.results.listedCount
                avgPrice = response.results.avgPrice24hr / 1000000000
                
                const floorPriceEmbed = new Discord.MessageEmbed()
                    .setColor("#e11f95")
                    .setTitle("**Solana Helper v 0.0.1**")
                    .setDescription(`Here are the stats for **${collection.toUpperCase()}** 
                    \n ** > Floor Price: **${(Math.round(floorPrice * 100)) / 100} Sols
                    \n ** > Volume:** ${(Math.round(volume * 100)) / 100} Sols
                    \n ** > Listed:**  ${listedCount}
                    \n ** > Average Price:** ${(Math.round(avgPrice * 100)) / 100} Sols
                    `)
                    .setTimestamp();
    
                interaction.reply({
                    embeds: [floorPriceEmbed]
                })
            } catch(err){
                console.error(err)

                const errorEmbed = new Discord.MessageEmbed()
                .setColor("#e11f95")
                .setTitle("**Magic Eden Price Checker!**")
                .setDescription(`**We are so sorry, there was a problem with your request** 
                \n __Make sure you typed your collection exactly__
                \n if thats not the case it may have been an internal error
                \n we will be working on a fix soon`)
                .setTimestamp();
                interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                })
            }
        }
}