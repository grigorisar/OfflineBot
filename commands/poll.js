const Discord = require('discord.js');
module.exports = {
    name: "poll" ,
    description: 'Command usage: $poll [message] "option 1" "option 2" .. "option 10".',
    execute(message, args) { 
        pollargs = format(args); 

        if(pollargs.length<2){
            message.channel.send('Include at least two options.');
            message.channel.send(this.description);
            return -1;
        }else if (pollargs.length>10){
            message.channel.send('Ten options maximum, try again. ');
            message.channel.send(this.description);
            return -1;
        }
        const [embed, reaction] = createPoll(pollargs);
        embed.setAuthor(message.member.user.username,message.member.avatarURL);
        // console.log(embed);
        sendPoll(message,embed,reaction);
    }
}

function format(args) {
    return args.toString().substring(args[0].length+1).replace(/,/g, ' ').split("\"").filter(function (str) { return /\S/.test(str)});
}

function createPoll(poll) {
    const reaction = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]

    try {
        const message = poll.shift();


        const embed = new Discord.MessageEmbed()
        .setAuthor("Greg")
        .setTimestamp()
        .setColor(0xFFC399)
        .setTitle("Let me know what you think.")
        .setDescription(message)
        .addField('React to vote.', optionBuilder(poll,reaction), true)
        .setFooter("StoneLightning");

        // console.log("Sending poll.");
        reaction.splice(poll.length);
        return [embed,reaction];
    } catch (error) {
        console.log(error);
        return -1;
    }

}

function optionBuilder(options,reaction) {
    var str = "";
    for (let index = 0; index < options.length; index++) {
        str += reaction[index].toString() + options[index].toString() + "\n";
    }
    // console.log(str);
    return str;
}

async function sendPoll (message,embed,reaction) {
    const m = await message.channel.send(embed);
    // console.log(reaction);
    for (const emoji of reaction) {
        await m.react(emoji);    
    } 
}