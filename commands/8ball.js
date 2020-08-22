const Discord = require('discord.js');

module.exports = {
    name: "8ball" ,
    usage: "<message>",
    category:"fun",
    description: "A bot that can answer your questions!",

    execute(message, args) {
        let question = args.toString().replace(/,/g,' '); 
        if(!question||!/\S/.test(question)) { // empty or only spaces tabs
            message.channel.send("You did not specify a question.")
        }else {
            let responses = [
                "Yes",
                "Definitely",
                "No",
                "Absolutely",
                "Not in a million years!"
            ];
            console.log(responses);
            let response = responses[Math.floor(Math.random()*responses.length)];

            let embed = new Discord.MessageEmbed()
            .setTitle(`8Ball!`)
            .setDescription(`Your question: ${question}\nMy Reply: ${response}`)
            .setColor(getRandomColor())
            // message.channel.send(embed);
        }
    },
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
    
