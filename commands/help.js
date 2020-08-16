module.exports = {
    name: 'help', 
    description: 'displays the bot commands',
    execute(msg, args){

        let help_out = "```" + "Berth's here to help\n" + 
                       "Berth's prefix for every command is ^ which can be typed by holding shift then pressing 6 (Shift + 6)\n\nCommands:\n" + 
                       "• ping - informs whether the bot is functional or not (^ping)\n" + 
                       "• add - adds the user's birthday to the database (^add @person m/d)\n" +
                       "• berthday - returns the birthday of a specific person if included in the database (^berthday @person)\n" + 
                       "• upcoming - queries the upcoming birthdays for the month and displays a list of the upcoming birthdays (^upcoming)\n\n" + 
                       "More commands will be added for future updates.\nIf you have any suggestions, feel free to contact anyone who has a Servant or a Moderator role!```"
        msg.channel.send(help_out);     
    }
}