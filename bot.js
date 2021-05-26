const Discord=require('discord.js');
require('dotenv').config();
const { getState, getDistricts, getSlots }=require('./cowinApi.js');
require('./user.js');
const client=new Discord.Client();
const mongoose=require('mongoose');
const User=require('mongoose').model('User');
mongoose.connect(process.env.mongoURL,{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}).then(() => console.log("DATABASE: Connection to database successful!"))
	.catch(err => console.log("DATABASE: " + err));


const prefix='#';


var datas=[];
var datadis=[];
var dataslot=[];


const createProfile=(tag,stid)=>{

    const person = new User({
    	tag:tag,
    	state_id:stid,
    	
    
  });






  person.save(function(err){
    if (err){
        console.log(err);
    }else return "success";
  });
	};



const updateDistrict=(tag,district)=>{
	User.findOneAndUpdate({"tag":tag},{"district_id":district},{new:true},(err,res)=>{
		if(err)
			console.log(err);
		else{
			console.log(district+" "+res);
		}
	});
} 



const findState=(tag)=>{
	return new Promise((resolve,reject)=>{
		
		User.findOne({tag:tag},(err,person)=>{
		
			
			if(err||!person)
				resolve(0);
			else
				resolve(person);
	}),(error)=>(reject(error));
	
	});

	
	
};


const updateAge=(tag,age)=>{
	console.log(20);
	User.findOneAndUpdate({"tag":tag},{$set:{"age":age}},{new:true},(err,res)=>{
		if(err)
			console.log(err);
	});

};


const updateStatus=(tag,value)=>{

	User.findOneAndUpdate({"tag":tag},{$set:{"subscribe":value}},{new:true},(err,res)=>{
		if(err)
			console.log(err);
	});

};

client.on('ready',async ()=>{
	console.log("Ready");
	const state=await getState();
	datas=state.states;


	
	
	
	
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

	
client.on('message',async (msg)=>{

	if(msg.author.bot) return;

	if(msg.content==="Hello"||msg.content==="Hi")
	{
		msg.reply("Welcome "+msg.author.tag);
		const embed=new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('ABOUT ME')
		.setDescription('Register for the daily or hourly updates of vaccine slots near you!!');
	
		msg.reply(embed);
	}

	if(!msg.content.startsWith(prefix))
		msg.reply("Please enter #start to proceed");

	if(msg.content==="#start")
	{


		User.findOne({tag:msg.author.tag},(err,person)=>{
		if(err)
			throw err;
		else if(person)
		{ 

			if(!person.district_id)
			{
				const embed=new Discord.MessageEmbed()
				.setColor('#0099ff')
				
				.setDescription('Enter your district in the format #district-districtname to proceed ');
	
				msg.reply(embed);
				return;
			}
			else if(!person.age)
			{
				const embed=new Discord.MessageEmbed()
				.setColor('#0099ff')
				
				.setDescription('Enter your age in the format #age-agenumber to proceed ');
	
				msg.reply(embed);
				return;

			}
			else{


				const embed=new Discord.MessageEmbed()
				.setColor('#0099ff')
				
				.setDescription('Enter #age-agenumber for age updation and #district-districtname for district updation');
	
				msg.reply(embed);
				return;
			}




			}
		else
		{
		const embed=new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setDescription('I think yo are new, so enter your state in the format #state-statename');
		msg.channel.send(embed);


		}



	});


	}

	
	if(msg.content.startsWith(prefix))
	{	
		const [key,value]=msg.content.trim().split("-");
		if(key==="#state")
		{		
			   const res=datas.find(({state_name})=>state_name.toUpperCase()===value.toUpperCase())
				
					
				  if(!res)
				{

				    const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setDescription(' Invalid state_name,try again');
					msg.channel.send(embed);
					return;
			
				}
			

					state_id=res.state_id;
					console.log(state_id+" ");
					const p=createProfile(msg.author.tag,state_id);
					const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setDescription('Enter your district in the format #district-districtname ');
					msg.channel.send(embed);
					
					
					
				


					
				
				
				}



		if(key==="#district")
		{	const res1=await findState(msg.author.tag);
			if(!res1)
			{
				const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription(' You have not entered a state_name');
					msg.channel.send(embed);
					return;
			}
			
			const district=await getDistricts(res1.state_id);
			datadis=district.districts;
			
			const result=datadis.find(({district_name})=>district_name.toUpperCase()===value.toUpperCase());
				
					
				  if(!result)
				{

				    const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription(' Invalid district_name,try again');
					msg.channel.send(embed);
					return;
			
				}
			

					const district_id=result.district_id;
					console.log(district_id+" ");
					updateDistrict(msg.author.tag,district_id);
					
					const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription('Enter your age in the format #age-agenumber ');
					msg.channel.send(embed);
		}






		if(key==="#age")
		{
			const res1=await findState(msg.author.tag);
			if(!res1.district_id)
			{
				const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription(' You have not entered a district_name');
					msg.channel.send(embed);
					return;
			}
			console.log(value);
			updateAge(msg.author.tag,parseInt(value));

		}

		if(key==="#subcribe")
		{
			updateStatus(msg.author.tag);

		}


	}	
	
	

	

	

	




	
	//msg.reply(datas[0]);


	
});

client.login(process.env.DISCORD_BOT_TOKEN);