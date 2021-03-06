const post = require('pg');

function verify_date(arr){
    let test_month = parseInt(arr[0]);
    let test_day = parseInt(arr[1]);

    let thirty = [4,5,9,11]
    let thirty_one = [1,3,5,7,8,10,12];

    if(test_month > 13 || test_month < 1){
        return false; 
    }
    else if(test_month == 2 && test_day > 29){
        return false;
    }
    else if(thirty.includes(test_month) && test_day > 30){
        return false; 
    }
    else if(thirty_one.includes(test_month) && test_day > 31){
        return false;
    }
    else{
        return true;
    }
}

module.exports = {
    name: 'add', 
    description: "adds the user's birthday to the database (`add @person m/d)",
    execute(msg, args){
        if(args[1] === undefined || args[2] === undefined){
            msg.channel.send("`Missing Argument(s) for the add birthday function`");
        }
        else{
            let tag = msg.mentions.members.first().user.tag;
            let nick = msg.mentions.members.first().nickname;
            let discord_id = args[1];
            
            let berth_input = args[2].split("/");
            if(!verify_date(berth_input)){
                msg.channel.send("Invalid Berthdate :cry:. Please try again!");
                return;
            }
            else{
                let bmonth = parseInt(berth_input[0]);
                let bday = parseInt(berth_input[1]);

                const pgclient = new post.Client({
                    user: process.env.DBUSER,
                    host: process.env.HOST, 
                    database: process.env.DATABASE, 
                    password: process.env.PASSWORD, 
                    port: process.env.PORT
                });
                
                pgclient.connect(); 
        
                pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE discord_id = '${args[1]}'`).then(res => {
                    // if length = 0, then there's already an entry 
                    if(res.rows.length > 0){
                        msg.channel.send(`Berth already knows ${res.rows[0].user}'s birthday`);
                        pgclient.end();
                    }
                    else{
                        pgclient.query(`INSERT INTO ${process.env.DISCSERVER} ("user","discord_id","nickname","month", "day") VALUES ('${tag}','${discord_id}','${nick}', ${bmonth}, ${bday})`).then(result => {
                            if(result.oid == 0){
                                msg.channel.send(`${tag}'s berthday added!`);
                            }

                            pgclient.end();
                        })
                    }      
                }).catch((e) => {
                    console.log('Error: ', e.message)});
                }
        }
        
    }
}