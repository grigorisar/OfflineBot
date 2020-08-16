const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = '$';


const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('path/to/app.properties');
getProperty = (pty) => {return prop.get(pty);}

const token = getProperty('app.token')

var version = "0.0.1"




bot.on('ready', () => {
    console.log('Offline Bot online');
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'help':
            message.channel.send('Made by Greg and Alex , in early Development');
            break;
        case 'info':
            if (args[1]=="devs") {
                message.channel.send('OceanGreg & Alextheninja8.');    
            } else if (args[1]=="version"){
                message.channel.send("Version: " + version);    
            } else {
                message.channel.send('Include an Argument');    
            }
            break;

    }
});

bot.login(token);


