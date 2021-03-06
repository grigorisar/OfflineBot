const fs = require('fs');
const Discord = require("discord.js");
const PropertiesReader = require('properties-reader');

const prop = PropertiesReader('./application.properties');
getProperty = (pty) => {return prop.get(pty);}

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const PREFIX = '$';
var version = "0.1.0"


const commandFiles = fs.readdirSync('./commands/').filter(file =>  file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}


bot.once('ready', () => {
    console.log('Offline Bot online');
});

bot.on('message', message => {
    if(!message.content.startsWith(PREFIX)) return -1; // return not $     
    
    let args = message.content.substring().split(" "); // can add a .slice(PREFIX.length) to remove the $ but I dont mind it

    //Trim command string and toLowerCase as case sensitivity doesn't matter.  
    let command = args.shift().toLowerCase();
    switch(command){
        case '$ping':
            bot.commands.get('ping').execute(message , args);
            break;
        case '$help':
            message.channel.send('Made by Greg, Alex and Vladi , in early Development');
            break;
        case '$info':
            bot.commands.get('info').execute(message , args);
            break;
        case '$clear':
            bot.commands.get('clear').execute(message , args);
            break;
        case '$poll':
            bot.commands.get('poll').execute(message , args);
            break;
        case '$8ball':
            bot.commands.get('8ball').execute(message , args);
            break;

    }
});

const token = getProperty('app.token')
bot.login(token);


