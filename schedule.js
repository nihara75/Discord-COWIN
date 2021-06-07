const Discord=require('discord.js');
const Cron=require('node-cron');
require('dotenv').config();
const { getState, getDistricts, getSlots }=require('./cowinApi.js');
require('./user.js');
const client=new Discord.Client();
const mongoose=require('mongoose');
const User=require('mongoose').model('User');
const id=842094345968812033;
var users=[];
var slots=[];
const sub=()=>{
	User.find({subscribe:true},(err,res)=>{
		if(!err)
		{   users=res;
			return res;}
		  
	});}


			

const hourtask=Cron.schedule('*/1 * * * *  ', async () => {
	const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
				   .setDescription('hello');
				   
				   
				   		
				   		
	await sub();				 


if(users){

users.forEach(async(item)=>{
	const age=item.age;
	//const id=item.user_id;
	const district_id=item.district_id;
	console.log(district_id);
	const slot=await getSlots(district_id,"08-06-2021");
	slots=slot.sessions;
	if(slots)
	{
		slots.forEach(ite=>{
			
			if(age>=18 && age<45)
			{
				if(ite.min_age_limit===18)
			{
				console.log(ite);
				
				const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle("SLOTS AVAILABLE")
					.setURL('https://www.cowin.gov.in/')
					.addFields({name:'vaccine', value:ite.vaccine},
						{name:'Location',value:ite.name},
						{name:'address',value:ite.address},
						{name:'Time',value:ite.from+' to '+ite.to},
						{name:'fee',value:ite.fee})
						
				   .setDescription('Register now!!');
				  
				   
				client.users.fetch('842094345968812033').then((user)=>{
					
					user.send(embed);
				})	
			}

			}else if(age>=45 && age<60)
			{
				if(ite.min_age_limit===45)
			{

				const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle("SLOTS AVAILABLE")
					.setURL('https://www.cowin.gov.in/')
					.addFields({name:'vaccine', value:ite.vaccine},
						{name:'Location',value:ite.name},
						{name:'address',value:ite.address},
						{name:'Time',value:ite.from+' to '+ite.to},
						{name:'fee',value:ite.fee})
				
				   .setDescription('Register now!!');
				   
				   
				client.users.fetch('842094345968812033').then((user)=>{
					console.log(user);
					user.send(embed);
				})	
			}

			}else if(age>=60)
			{
				if(ite.min_age_limit===60)
			{

				const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle("SLOTS AVAILABLE")
					.setURL('https://www.cowin.gov.in/')
					.addFields({name:'vaccine', value:ite.vaccine},
						{name:'Location',value:ite.name},
						{name:'address',value:ite.address},
						{name:'Time',value:ite.from+' to '+ite.to},
						{name:'fee',value:ite.fee})
						
				   .setDescription('Register now!!');
				   
				   
				client.users.fetch('842094345968812033').then((user)=>{
					console.log(user);
					user.send(embed);
				})	
			}
			}
			
			
		});
		
	}
	
});

}



  console.log('running a task every minute');

},{timezone: "Asia/Kolkata"});

client.on('message',async(msg)=>{
	if(msg.author.bot)
	   return;
});
client.login(process.env.DISCORD_BOT_TOKEN);
global.client=client;
module.exports={hourtask};