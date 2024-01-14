const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose')
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/comment');

const app = express();

// Use body-parser middleware for JSON parsing
app.use(bodyParser.json());

// Discord Bot setup
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ]
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect to DB.')
        new CommandKit({
            client,
            eventsPath: path.join(__dirname, 'events'),
            commandsPath: path.join(__dirname, 'commands'),
        })
        // Use the commentRoutes for /api routes
        app.use('/', commentRoutes);

        // Start Express server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        client.login(process.env.BOT_TOKEN)
    } catch (error) {
        console.log(error)
    }
})()