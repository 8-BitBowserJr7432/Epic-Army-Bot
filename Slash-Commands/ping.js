const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
    async execute(interaction){
        await interaction.reply('Pong!');
    }
};

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client_Id, Guild_Id, TOKEN } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(Client_Id, Guild_Id),
            { body: commands }
        );
        console.log('Slash commands registered successfully!');
    } catch(error){
        console.error(error);
    }
})();