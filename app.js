// imports
const {Client, Intents} = require("discord.js");
const {token, dev_id, privileged_ids} = require("./config.json");

// Create Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });


/* ========================= Helper Methods ========================= */
const shuffle = (arr) => {
    /* Knuth Shuffle
     * Random number x between i and arr.len
     * swap this[i] and this[x]
    */
    for (let i=0; i<arr.length; i++){
        var x = Math.floor(Math.random() * i)
        var temp = arr[i];
        arr[i] = arr[x];
        arr[x] = temp;
    };
    return arr;
};

/* ========================= Events ========================= */

// Ready
client.on('ready', () => {
    console.log('Ready');
});

// Message
client.on('messageCreate', (message) => {
    if (message.content.toLocaleUpperCase() === "SCATTER" && (message.author.id === dev_id || privileged_ids.includes(message.author.id))) {
        console.log("Engage Scatter Protocol");
        /* 
         * - Get Voice Chats and occupants
         * -- Store VC's in array
         * -- Store occupants in array
         * - Play SCATTER.mp4 in the vc with Jackie
         * - Shuffle occupants between vc's
         * -- Shuffle VC Array
         * -- Shuffle Occupant Array
         * -- For i=0 to occupant array length
         * --- dest = vcArray[i%vcArray.length]
         * --- move occupant[i] to dest
        */
        const guild = message.guild;
        const cm = guild.channels;
        let occupants = Array();
        let voiceChannels = Array();
        for (const [id, cache] of cm.cache) {
            if (cache.type === "GUILD_VOICE"){
                voiceChannels.push(cache);
                for (const [id, member] of cache.members) {
                    occupants.push(member.voice);
                };
            };
        };
        occupants = shuffle(occupants);
        voiceChannels = shuffle(voiceChannels);
        for (var i=0; i<occupants.length; i++) {
            occupants[i].setChannel(voiceChannels[i % voiceChannels.length], "SCATTER!");
        }
    };
});

// Login
client.login(token);
