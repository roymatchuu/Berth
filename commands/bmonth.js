const post = require('pg');

module.exports = {
    name: 'bmonth', 
    description: "queries the upcoming birthdays for the month and returns them",
    execute(msg, args){
        // determines the date when the command call was made to determine month and day
        let today = new Date(); 
        let curr_month = today.getMonth() + 1;
        let curr_day = today.getDate();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const pgclient = new post.Client({
            user: process.env.DBUSER,
            host: process.env.HOST, 
            database: process.env.DATABASE, 
            password: process.env.PASSWORD, 
            port: process.env.PORT
        });

        // establish connection to the database
        pgclient.connect();

        // •
        pgclient.query(`SELECT * FROM ${process.env.DISCSERVER} WHERE month = '${curr_month}' AND day > '${curr_day}' ORDER BY day`).then(res => {
            if(res.rows.length === 0){
                let none_str = "There are no upcoming birthdays for the rest of " + monthNames[monthNames];
                msg.channel.send(none_str);
            }
            else{
                let month_str = '```Here are the upcoming birthdays for the month of ' + monthNames[curr_month-1] + ':\n';

                for(let i = 0; i < res.rows.length; i++){
                    month_str += `• ${res.rows[i].user}: ${res.rows[i].month}/${res.rows[i].day}\n`;
                }

                month_str += '```';
                msg.channel.send(month_str);
            }

        }).finally(() => pgclient.end());
    }
}