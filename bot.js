// bot delimeter 
const delim = "`";

const dc = require('./daily_checker.js');
const Discord = require("discord.js");
const bot = new Discord.Client();

const scheduler = require('node-cron');

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
        case "add": 
            bot.commands.get('add').execute(msg, args);
            break; 
        case "bmonth":
            bot.commands.get('upcoming').execute(msg, args);
            break; 
    }
});

// activate the bot using a token 
bot.login(process.env.TOKEN);

module.exports = bot;

// 1 is 12 bc of daylight saving?
let daily = scheduler.schedule('45 13 * * *', dc, 
{
    scheduled: true,
    timezone: "America/Los_Angeles"
});

daily.start();