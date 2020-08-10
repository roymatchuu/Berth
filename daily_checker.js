const post = require('pg');


function daily_check(){ 
    let bot = require('./bot.js');
    let today = new Date(); 
    console.log("Let's goooo!");
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

                let send_str = `Today is ${res.rows[i].user}'s birthday!`;          
                try{
                    bot.channels.cache.get(`${process.env.DISCHANNEL}`).send(`${send_str}`);
                }catch(e){console.log("[ERROR]",e)}
            }
        }      
    }).finally(() => pgclient.end());
}

module.exports = daily_check;