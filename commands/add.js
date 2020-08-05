module.exports = {
    name: 'add', 
    description: "adds the user's birthday to the database (`add @person date)",
    execute(msg, args){
        if(args[1] === undefined || args[2] === undefined){
            msg.channel.send("Missing Arguments for adding someone's birthday");
            return; 
        }
        else{
            const post = require('pg');
            const R = require('ramda');

            const pgclient = new post.Client({
                user: process.env.DBUSER,
                host: process.env.HOST, 
                database: process.env.DATABASE, 
                password: process.env.PASSWORD, 
                port: process.env.PORT
            });

            pgclient.connect(); 
// insert into "United" ("user","birthday","disc_id") values ('yuh','7/24','1212');
            pgclient.query(`INSERT INTO "${process.env.DISCSERVER}" ("user","birthday","disc_id") VALUES ("","","")`).then(res => {
                // const result = R.head(R.values(R.head(res.rows)));
                
                console.log(res.rows);
            }).finally(() => pgclient.end());

            // pgclient.query(`SELECT * FROM "${process.env.DISCSERVER}"`).then(res => {
            //     // const result = R.head(R.values(R.head(res.rows)));
                
            //     console.log(res.rows);
            //     console.log(res.rows[0].user);
            //     msg.channel.send(res.rows[0].user);
            // }).finally(() => pgclient.end());
        }
        
    }
}