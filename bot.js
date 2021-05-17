const Discord=require('discord.js');
require('dotenv').config();
const client=new Discord.Client();
client.on('ready',()=>{
	console.log("Ready");
});

client.on('message',msg=>{
	if(msg.content==='Nihara')
		msg.reply("Welcome nihara");
});

client.login(process.env.DISCORD_BOT_TOKEN);