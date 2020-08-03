module.exports = {
    name: 'add', 
    description: "adds the user's birthday to the database",
    execute(msg, args){
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

        pgclient.query(`SELECT * FROM "${process.env.DISCSERVER}"`).then(res => {
            // const result = R.head(R.values(R.head(res.rows)));
            
            console.log(res.rows);
            console.log(res.rows[0].user);
        }).finally(() => pgclient.end());
    }
}