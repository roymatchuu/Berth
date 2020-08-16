const post = require('pg');

module.exports = {
    name: 'berthday', 
    description: "sends the birthday back",
    execute(msg, args){
        if(args[1] === undefined){
            msg.channel.send("`Missing Arguments for the berthday function`");
            return; 
        }
        else 
        {
            const pgclient = new post.Client({
                user: process.env.DBUSER,
                host: process.env.HOST, 
                database: process.env.DATABASE, 
                password: process.env.PASSWORD, 
                port: process.env.PORT
            });

            pgclient.connect();

            pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE discord_id = '${args[1]}'`).then(res => {
                if(res.rows.length === 0){
                    msg.channel.send(`Berth does not recall recording ${args[1]}'s birthday. Use the add command to add someone's birthday to the database!`);
                }
                else{
                    let bday_found = "`" + res.rows[0].user + "'s birthday is on " + res.rows[0].month + "/" + res.rows[0].day + "`";
                    msg.channel.send(bday_found);
                }
            }).finally(() => pgclient.end());
        }
    }
}