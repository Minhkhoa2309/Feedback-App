const { REST, Routes } = require('discord.js');
require('dotenv').config();
const commands = [
    {
        name: 'feedback',
        description: 'Collect Your Feedback!',
    },
];
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})()