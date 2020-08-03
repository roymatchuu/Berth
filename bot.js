// bot delimeter 
const delim = "`";

const Discord = require("discord.js");
const bot = new Discord.Client();

// uses dotenv to extract stored credentials 
const { config } = require("dotenv");

config({
    path: __dirname + "/.env"
});

// Command Handler
const fs = require('fs');
bot.commands = new Discord.Collection();

// signify where the command files are
const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of cmdFiles){
    const cmd = require(`./commands/${file}`);

    bot.commands.set(cmd.name, cmd);
}


// Bot initialized 
bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity('Birthdays', { type: 'WATCHING' });
});

bot.on('message', msg => {
    if(!msg.content.startsWith(delim)) return;

    let args = msg.content.substring(delim.length).split(" "); 
    
    switch(args[0]){
        case "ping":
            bot.commands.get('ping').execute(msg, args);
            break; 
        

    }
});

// activate the bot using a token 
bot.login(process.env.TOKEN);
