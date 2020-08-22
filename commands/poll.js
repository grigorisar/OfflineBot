const Discord = require('discord.js');
const REACTIONS = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]

module.exports = {
    name: "poll" ,
    usage: '$poll [message] "option 1" "option 2" .. "option 10".',
    category: "fun",
    description: "Creates a Poll with up to 10 different poll options.",
    execute(message, args) {    
        args = format(args); 

        //Message (arg[0]) 1 + range of options: 2-10
        if(args.length<3){
            message.channel.send(`Include at least two options.\n${this.usage}`);
            return -1;
        }else if (args.length>11){
            message.channel.send(`Ten options maximum, try again.\n${this.usage}`);
            return -1;
        }

        sendPoll(message,createEmbed(message,args));
        return 0;
    }
}

//Create Embed and fill out fields.
function createEmbed(message,args) {
    try {
       const embed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.username) 
        .setTimestamp()
        .setColor(getRandomColor())
        .setTitle("Let me know what you think.")
        .setDescription(args.shift()) 
        .addField('Select Options.', optionBuilder(args), true)
        .setFooter("Offline Bot.");
        
        // After removing arg[0] aka the description, Trim reactions.
        REACTIONS.splice(args.length);

        return embed;
    } catch (error) {
        console.log(error);
        message.channel.send("Congrats you managed to break the command, DM Gregory#6547 to fix it for all of us. :) ");
        return -1;       
    }
}

//String Builder to look nice and fancy.
function optionBuilder(args) {
    //args is Pass By Reference so we init. a local variable.
    var str = "", i = 0;
    for (const emoji of REACTIONS) {
        str += emoji + args[i++] + "\n"; //Local scope, args table not affected.   
    }
    return str;
}

//Reacting has to be Async.
async function sendPoll (message,embed) {
    if (message) {
        const m = await message.channel.send(embed);
        // console.log(reaction);
        for (const emoji of REACTIONS) {
            await m.react(emoji);    
        } 
    } else {
        console.log("Error In poll.");
        return -1;
    }
}

// String formatting for the arguments done by yours truly.
function format(args) {
    return args.toString().replace(/,/g, ' ').split("\"").filter(function (str) { return /\S/.test(str)});
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}