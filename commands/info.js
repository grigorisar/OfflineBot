module.exports = {
    name: "info" ,
    usage: "$ping" ,
    category: "info",
    description: "Ping command.",
    execute(message, args) {
        if (args[1]=="devs") {
            message.channel.send('OceanGreg, Alextheninja8, vladibeer_ .');    
        } else if (args[1]=="version"){
            message.channel.send("Version: " + version);    
        } else {
            message.channel.send('Include an Argument');    
        }
    }
}