import { Telegraf } from 'telegraf';

const bot = new Telegraf('<YOUR_BOT_TOKEN>'); // Bot tokeningizni joylashtiring

// Kanal ID'larini saqlovchi ro'yxat
const channels = [
    '@channel1',
    '@channel2',
    '@channel3',
    // Davom ettiring ...
];

// Xabarni barcha kanallarga yuborish funktsiyasi
const sendMessageToAllChannels = async (message: string) => {
    for (const channel of channels) {
        try {
            await bot.telegram.sendMessage(channel, message);
            console.log(`Message sent to ${channel}`);
        } catch (error) {
            console.error(`Failed to send message to ${channel}:`, error);
        }
    }
};

// Buyruq yoki trigger asosida xabar yuborish
bot.command('broadcast', async (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' ');
    if (message) {
        await sendMessageToAllChannels(message);
        ctx.reply('Message sent to all channels.');
    } else {
        ctx.reply('Please provide a message to broadcast.');
    }
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log('Bot is running');
});

// Graceful stop handling
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
