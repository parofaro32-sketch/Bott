const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ]
});

dotenv.config();

client.on('ready', () => {
    console.log('Discord bot is ready!');
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!')) {
        const args = message.content.substring(1).split(' ');
        const command = args[0];
        
        if (command === 'ping') {
            message.reply('Pong!');
        } else if (command === 'help') {
            message.reply('Available commands: `!ping` - Test ping, `!help` - Show help');
        } else if (command === 'api' && process.env.YOUR_API_KEY) {
            message.reply(`API Key: ${process.env.YOUR_API_KEY}`);
        }
    }
});

try {
    client.login(process.env.DISCORD_BOT_TOKEN);
} catch (error) {
    console.error('Failed to login:', error);
}