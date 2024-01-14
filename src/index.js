const { Client, IntentsBitField, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`)
})

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hello') {
        message.reply('Hieu ga')
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'feedback') {
        await interaction.reply('Thank you for your feedback!');
    }
});
client.login(process.env.BOT_TOKEN)