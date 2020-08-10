const post = require('pg');


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
    let curr_day = today.getDay();

    pgclient.connect();

    pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE month = '${curr_month}' AND day = '${curr_day}'`).then(res => {
    // pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE month = '4' AND day = '23'`).then(res => {
        // console.log(`res.rows.length is ${res.rows.length}`);
        if(res.rows.length == 0){
            return; 
        }
        else{
            for(i = 0; i < res.rows.length; i++){
                console.log(`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} Today is ${res.rows[i].user}'s birthday`);
                bot.channels.cache.get(process.env.DISCSERVER).send(`Today is ${res.rows[i].user}'s birthday`);
            }
        }      
    }).finally(() => pgclient.end());
}

module.exports = daily_check;