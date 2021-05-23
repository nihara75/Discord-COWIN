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
		useUnifiedTopology: true
	}).then(() => console.log("DATABASE: Connection to database successful!"))
	.catch(err => console.log("DATABASE: " + err));


const prefix='#';


var datas=[];
var datadis=[];
var dataslot=[];


const createProfile=(tag,stid,dtid)=>{

    const person = new User({
    	tag:tag,
    	state_id:stid,
    	district_id:dtid
    
  });






  person.save(function(err){
    if (err){
        console.log(err);
    }else return "success";
  });
	};



const updateDistrict=(tag,district)=>{
	User.findOneAndUpdate({tag:tag},{$set:{$district_id:district}},(err,res)=>{
		if(err)
			console.log(err);
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


client.on('ready',async ()=>{
	console.log("Ready");
	const state=await getState();
	datas=state.states;


	
	
	
	
});

	
client.on('message',async (msg)=>{

	if(msg.author.bot) return;

	if(msg.content==="Hello"||msg.content==="Hi")
	{
		msg.reply("Welcome "+msg.author.tag);
		const embed=new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('ABOUT ME')
		.setDescription('Register for the daily or hourly updates of vaccine slots near you!! ');
	
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
			}
		else
		{
		const embed=new Discord.MessageEmbed()
		.setColor('#0099ff')
	
		.setDescription('I think yo are new, so enter your state in the format #state-statename ');
		msg.channel.send(embed);


		}



	});


	}

	const res={};
	if(msg.content.startsWith(prefix))
	{	
		const [key,value]=msg.content.trim().split("-");
		if(key==="#state")
		{		
			    res=datas.find(({state_name})=>state_name.toUpperCase()===value.toUpperCase())
				
					
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
					const p=createProfile(msg.author.tag,state_id,"id");
					const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription('Enter your district in the format #district-districtname ');
					msg.channel.send(embed);
					
					
					
				


					
				
				
				}



		if(key==="#district")
		{	const res1=await findState(msg.author.tag);
			
			const district=await getDistricts(res1.state_id);
			datadis=district.districts;
			
			const result=datadis.find(({district_name})=>district_name.toUpperCase()===value.toUpperCase());
				
					
				  if(!result)
				{

				    const embed=new Discord.MessageEmbed()
					.setColor('#0099ff')
	
					.setDescription(' Invalid state_name,try again');
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










	}	
	
	

	

	

	




	
	//msg.reply(datas[0]);


	
});

client.login(process.env.DISCORD_BOT_TOKEN);