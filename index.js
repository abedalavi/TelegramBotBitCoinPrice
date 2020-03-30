const https = require('http');
var CronJob = require('cron').CronJob;
const TelegramBot = require('node-telegram-bot-api');
const token = "1117341186:AAEdTNCuXyPHUCLOaDlQcQgEwCyijHCqoIg"; //bitcoin
// const token = "1029352844:AAEXUaoppERzW3ypp2OedZVZoIfXWY0tryo"; // testLocal
const options = new URL('http://api.coindesk.com/v1/bpi/currentprice.json');
const abedID = 629284243;
const bot = new TelegramBot(token, {
    polling: {
        params: {
            offset: -1
        }
    },
});
///////////////////////////////////////////////////////////////////////
process.on('uncaughtException', (ex) => {
    console.log(new Date() + ': Uncaught Exception: ' + ex.message);
});

process.on('unhandledRejection', (ex) => {
    console.log(new Date() + ': Unhandled Rejection: ' + ex);
});

bot.on('polling_error', (error) => {
    console.log(new Date() + `Polling error` + error); // => 'EFATAL'
});

process.on('exit', (code) => {
    console.log(new Date() + `Process exit event with code: `, code);
    bot.sendMessage(abedID, new Date() + `: Procees Exited!`);
});
bot.sendMessage(abedID, new Date() + ": Program Started!").catch(e => {});
/////////////////////////////////////////////////////////////////////////
var price = 0;
var job = new CronJob('* * * * *', function () {
    const req = https.request(options, res => {
        res.on('data', d => {
            let result = JSON.parse(d);
            bot.sendMessage(`@bitcoin_gheymat`, `\n${result.bpi.USD.rate} 💲USD\n\n@bitcoin_gheymat `);
           
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}, null, true, 'America/Los_Angeles');
job.start();
////////////////////start/////////////////
bot.onText(/\/start/, async (msg) => {
    if (checkPrivate(msg)) {
        try {
            await bot.sendMessage(msg.from.id, "خوش آمدید");
            mainMenu(msg.from.id);
        } catch (e) {
            console.log(new Date() + '/start error: ' + e);
        }
    }
});
////////////////////checkPrivate/////////////////
function checkPrivate(msg) {
    if (msg.chat.type === 'private') return true
    else return false;
};
//////////////////main menu/////////////////////
async function mainMenu(id) {
    try {
        await bot.sendMessage(id, "منوی اصلی", {
            "parse_mode": "Markdown",
            "reply_markup": {
                "keyboard": [
                    ["دربارۀ بیت کوین", `روش نصب coinomi`,"احراز هویت"],
                    ["خرید بیت‌کوین", `فروض بیت‌کوین`,"فروش کیف پول سخت‌افزاری"],
                    
                ],
                "one_time_keyboard": true
            }
        });
    } catch (e) {
        console.log(new Date() + 'main menu: ' + e);
    }
};