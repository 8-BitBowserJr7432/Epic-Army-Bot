const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'MESSAGE_CONTENT'],
    partials: ['CHANNEL', 'MESSAGE']
});

require('.env').config();

const token = process.env.TOKEN;
const clientID = process.env.clientID;
const guildID = process.env.GuildID;
const ownerId = process.env.OWNER_ID;

// GUILD_ID for testing for one server.


client.once('ready', async () => {
    console.log(`Client has been logged into! ${client.user.username}`);

    client.user.setPresence({
    status: 'dnd', // online, idle, dnd, or invisible
    activity: {
        name: '8-BitBowserJr7432 (zelda_life) is building me!',
        type: 'PLAYING' // Options: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
     }
   });
});

client.on('messageCreate', async (message) => {
    if(message.content.toLowerCase() === "!test"){
        message.reply("Hello there!").catch(err => console.error(err));
    };
});

client.on('messageCreate', async (message) => {
    if(message.content === '!ping'){
        const latency = Date.now() - message.createdTimestamp;
        const apilatency = Math.round(client.ws.ping);
        message.channel.send(`🏓 Pong!\nLatencey: ${latency}ms\nAPI Latency: ${apilatency}ms`);
    };
});

client.on('messageCreate', async (message) => {
    if(message.content === '!shutdown'){
        if(message.author.id !== OWNER_ID){
            return message.reply('You are not authorized to use this command.');
        }
        message.channel.send('Ok, I am not shutting down...');
    }
});

client.on('messageCreate', async (message) => {
    if(message.content.startsWith('!say')){
        // Check if the author is a bot
        if(message.author.bot) return;

        // Get the message content after the command
        const text = message.content.slice(5); // Removes "!say"

        if(!text) return message.reply('You need to tell me what to say!');

        message.channel.send(text);
    }
});

client.on('messageCreate', async (message) => {
    if(message.content === '!coinflip'){
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        message.channel.send(`You flipped: ${result}`);
    }
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true })
    }
});

client.login(TOKEN);