// imports
const {Client, Intents} = require("discord.js");
const {token} = require("./config.json");

// Create Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

/* ========================= Events ========================= */

// Ready
client.on('ready', () => {
    console.log('Ready');
});

// Message
client.on('messageCreate', (message) => {
    if (message.content.toLocaleUpperCase() === "SCATTER") {
        console.log("Engage Scatter Protocol");
        // TODO
    };
});

// Login
client.login(token);
