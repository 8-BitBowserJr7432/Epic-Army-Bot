const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'MESSAGE_CONTENT'],
    partials: ['CHANNEL', 'MESSAGE']
});

// require('dotenv').config();



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

const activities = [
  { name: 'Mini-games', type: 'PLAYING' },
  { name: 'your commands with ! prefix', type: 'LISTENING' },
  { name: 'Epic Army VI👾!!! Server', type: 'WATCHING' }
];

let i = 0;
setInterval(() => {
  client.user.setActivity(activities[i]);
  i = (i + 1) % activities.length;
}, 10000); // Change every 10 seconds

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

// ...existing code...

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!guess')) {
        // Generate a random number between 1 and 10
        const number = Math.floor(Math.random() * 10) + 1;
        const args = message.content.split(' ');
        const guess = parseInt(args[1]);

        if (!guess || guess < 1 || guess > 10) {
            return message.reply('Please guess a number between 1 and 10. Usage: `!guess 5`');
        }

        if (guess === number) {
            message.reply(`🎉 Correct! The number was ${number}.`);
        } else {
            message.reply(`❌ Wrong! The number was ${number}. Try again!`);
        }
    }
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!rps')) {
        const choices = ['rock', 'paper', 'scissors'];
        const args = message.content.split(' ');
        const userChoice = args[1]?.toLowerCase();

        if (!choices.includes(userChoice)) {
            return message.reply('Please choose rock, paper, or scissors. Usage: `!rps rock`');
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result;
        if (userChoice === botChoice) {
            result = "It's a tie!";
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = "You win!";
        } else {
            result = "You lose!";
        }

        message.reply(`You chose **${userChoice}**.\nI chose **${botChoice}**.\n${result}`);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong!');
    }

    if (interaction.commandName === 'rps') {
        const userChoice = interaction.options.getString('choice').toLowerCase();
        const choices = ['rock', 'paper', 'scissors'];
        if (!choices.includes(userChoice)) {
            return interaction.reply('Choose rock, paper, or scissors.');
        }
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;
        if (userChoice === botChoice) result = "It's a tie!";
        else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) result = "You win!";
        else result = "You lose!";
        await interaction.reply(`You chose **${userChoice}**.\nI chose **${botChoice}**.\n${result}`);
    }
});

client.login(TOKEN);