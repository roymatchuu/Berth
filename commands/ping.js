let today = new Date(); 
module.exports = {
    name: 'ping', 
    description: 'informs whether the bot is working or not',
    execute(msg, args){
        msg.channel.send('Berth is awake!');
        // console.log((today.getMonth()+1) + '/' + today.getDay());
    }
}