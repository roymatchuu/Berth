const post = require('pg');
const Discord = require("discord.js");

const bday_greetings = ["Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!",
                        "Happy birthday! I hope all your birthday wishes and dreams come true.",
                        "May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!",
                        "May you be gifted with life’s biggest joys and never-ending bliss. After all, you yourself are a gift to earth, so you deserve the best. Happy birthday.",
                        "Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world to make this year the best ever. Enjoy the ride."];

const bday_gifs = ["https://media0.giphy.com/media/xT8qB6yf3ZmoDscN7a/giphy.gif",
                   "https://media1.giphy.com/media/mcJohbfGPATW8/giphy.gif?cid=ecf05e479j2v5o0y3chq2ex4axvw0f6jijruw0mo9rd7psvh&rid=giphy.gif",
                   "https://media1.giphy.com/media/cROwFEvVvhNG8/giphy.gif?cid=ecf05e47ob5yrs65utokylwepk7dfq82ol2w5wv7kfas001g&rid=giphy.gif",
                   "https://media3.giphy.com/media/26FPIV12CYbDSVIR2/giphy.gif?cid=ecf05e47ob5yrs65utokylwepk7dfq82ol2w5wv7kfas001g&rid=giphy.gif",
                   "https://media1.giphy.com/media/Ymm8vnWUiN6yk/giphy.gif?cid=ecf05e47d8fc551caf4588897c525ac881a82bd00af9bb62&rid=giphy.gif",
                   "https://media2.giphy.com/media/cdHZH8zV1wRix1KvB3/giphy.gif?cid=ecf05e47r4i6u0n2vbeoc9cfmmyliylyxcp6a49ryf2f3bm4&rid=giphy.gif"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function daily_check(){ 
    let bot = require('./bot.js');
    let today = new Date(); 
    // console.log("Let's goooo!");

    const pgclient = new post.Client({
        user: process.env.DBUSER,
        host: process.env.HOST, 
        database: process.env.DATABASE, 
        password: process.env.PASSWORD, 
        port: process.env.PORT
    });

    let curr_month = today.getMonth()+1
    let curr_day = today.getDate();
    console.log(`month: ${curr_month} day: ${curr_day}`);

    
    pgclient.connect();
    
    pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE month = '${curr_month}' AND day = '${curr_day}'`).then(res => {
    // pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE month = '4' AND day = '23'`).then(res => {
        console.log(`res.rows.length is ${res.rows.length}`);
        if(res.rows.length == 0){
            return; 
        }
        else{
            for(i = 0; i < res.rows.length; i++){
                console.log(`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} Today is ${res.rows[i].user}'s birthday`);

                let greeting_call = res.rows[i].nickname === "undefined" ? res.rows[i].user : res.rows[i].nickname;

                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Happy Birthday ${greeting_call}`)
                .setAuthor("Berthday Celebration!", 'https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/9f/e5/e1/9fe5e1c1-9dcc-e380-f4f6-c0db4c74f15c/AppIconB-0-0-1x_U007emarketing-0-0-0-10-0-0-85-220.png/246x0w.png')
                .setDescription(bday_greetings[getRandomInt(bday_greetings.length - 1)])
                .setImage(bday_gifs[getRandomInt(bday_gifs.length - 1)]);

                let send_str = `Today is ${res.rows[i].discord_id}'s birthday!`;          
                try{
                    bot.channels.cache.get(`${process.env.DISCHANNEL}`).send(`${send_str}`);
                    bot.channels.cache.get(`${process.env.DISCHANNEL}`).send(embed);
                }catch(e){console.log("[ERROR]",e)}
            }
        }      
    }).finally(() => pgclient.end());
}

module.exports = daily_check;