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
    let args = message.content.substring().split(" ");
    //Popping command string, so we don't have to trim it the executables.
    let command = args.shift();
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
    }
});

const token = getProperty('app.token')
bot.login(token);


