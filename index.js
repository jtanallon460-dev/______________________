const mineflayer = require('mineflayer');

// Configuration details for your Minecraft Server
const botOptions = {
    host: 'localhost',          // Change to your server's IP address (e.g., 'my-server.net')
    port: 25565,                // Change if your server uses a custom port
    username: 'ServerBot',      // The in-game name your bot will display
    version: '1.20.1',          // Match this exactly to your Minecraft server version
    
    // Auth type: Use 'microsoft' for real premium accounts, or 'offline' for cracked/LAN servers.
    auth: 'offline'             
};

// Create the bot instance
let bot;

function startBot() {
    console.log(`Connecting bot to ${botOptions.host}:${botOptions.port}...`);
    bot = mineflayer.createBot(botOptions);

    // Triggered when the bot successfully spawns into the world
    bot.once('spawn', () => {
        console.log(`${bot.username} has joined the server!`);
        bot.chat('Hello world! I am online.');
    });

    // Simple feature: Respond to chat messages from other players
    bot.on('chat', (username, message) => {
        // Don't reply to itself
        if (username === bot.username) return;

        if (message === '!hello') {
            bot.chat(`Hello @${username}! How can I help you today?`);
        }
    });

    // Auto-reconnect if the bot gets kicked or the server restarts
    bot.on('end', (reason) => {
        console.log(`Bot disconnected. Reason: ${reason}. Reconnecting in 10 seconds...`);
        setTimeout(startBot, 10000);
    });

    // Error handling to prevent the script from crashing completely
    bot.on('error', (err) => {
        console.error('An error occurred with the bot:', err);
    });
}

// Fire up the bot script
startBot();

