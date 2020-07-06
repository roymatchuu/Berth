const { Client } = require("discord.js");
const { config } = require("dotenv");
const client = new Client();

const delim = "`";

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity('Birthdays', { type: 'WATCHING' });
});

client.on('message', msg => {
    if (msg.content === `${delim}ping`) {
    //   msg.reply('pong');
      msg.channel.send('Berth is awake!');
    }
});


client.login(process.env.TOKEN);