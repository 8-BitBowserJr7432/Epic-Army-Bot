const { REST, Routes } = require('discord.js');
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'rps',
    description: 'Play rock-paper-scissors',
    options: [
      {
        name: 'choice',
        type: 3, // STRING
        description: 'Your choice: rock, paper, or scissors',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken('YOUR_TOKEN_HERE');

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands('CLIENT_ID', 'GUILD_ID'),
      { body: commands },
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();