
module.exports = {
    name: "clear" ,
    usage: "$clear <number>",
    category: "moderation",
    description: "Clear messages max (20)",
    execute(message, args) { 
        if (!args[1]) {
            message.channel.send("No number of messages to clear provided.");
        }else {
            // Showing how to delete messages
            // message.channel.bulkDelete(args[1]);
            message.channel.send("Deleted "+args[1]+" Messages in "+message.channel.name+".");
        }
    }
}