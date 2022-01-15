const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}];
const rest = new REST({ version: '9' }).setToken('token');
const { CLIENT_ID, GUILD_ID, token } = require('./config.json');
const headers = {
    'Authorization': `Bot ${token}`
};

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.on("messageCreate", async (message) => {
    if (message.content.startsWith("ping")) {
        await message.channel.send("pong!");
    }
});

client.login(token);

//to go online type "node ." or "node main.js" in terminal