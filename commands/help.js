
module.exports = {
    name: "help" ,
    description: "Help for commands and user manuals.",
    execute(message, args) {
        message.channel.send("No number of messages to clear provided.");
        message.channel.send("Deleted "+args[1]+" Messages in "+message.channel.name+".");
    }
}