const { Client, GatewayIntentBits } = require('discord.js');
const { events, runApp } = require('./app'); // Importar la app y el EventEmitter

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Token del bot
const token = 'PUT_TOKEN_HERE';

// Canal de Discord donde enviar errores
const channelId = 'PUT_CHANNEL_ID_HERE';

// Evento: El bot está listo
client.once('ready', () => {
    console.log(`¡Bot conectado como ${client.user.tag}!`);
    // Iniciar la aplicación cuando el bot esté listo
    runApp();
});

// Evento: Escuchar errores de la aplicación
events.on('error', (error) => {
    console.error("Error capturado:", error.message);

    // Enviar el error a Discord
    const channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(`🔴 **Error capturado en la aplicación:**\n\`\`\`${error.message}\`\`\``);
    } else {
        console.error("No se pudo encontrar el canal.");
    }
});

// Iniciar el bot
client.login(token);