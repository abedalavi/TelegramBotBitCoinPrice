const request = require('request');
var CronJob = require('cron').CronJob;
const TelegramBot = require('node-telegram-bot-api');
const token = "1117341186:AAEdTNCuXyPHUCLOaDlQcQgEwCyijHCqoIg"; //bitcoin
// const token = "1029352844:AAEXUaoppERzW3ypp2OedZVZoIfXWY0tryo"; // testLocal

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

var job = new CronJob('* * * * *', function () {
    request('http://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DOGE&tsyms=USD&api_key=40c6a434d7e306a35fa81943078ca30b652be0a09dce8fdc5f38399fc2169ef3', {
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log(err);
            bot.sendMessage(abedID,err);
        }
        let BTC = res.body.BTC.USD;
        let ETH = res.body.ETH.USD;
        let LTC = res.body.LTC.USD;
        let DOGE = res.body.DOGE.USD;
        // console.log(BTC, ETH, LTC, DOGE);
        bot.sendMessage(`@bitcoin_gheymat`,`Bitcoin: ${BTC} 💲 USD\n\nEthereum: ${ETH} 💲 USD\n\nLitecoin: ${LTC} 💲 USD\n\nDogecoin: ${DOGE} 💲 USD\n\n👉@bitcoin_gheymat`);
    });
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
                    ["دربارۀ بیت کوین", `روش نصب coinomi`, "احراز هویت"],
                    ["خرید بیت‌کوین", `فروض بیت‌کوین`, "فروش کیف پول سخت‌افزاری"],

                ],
                "one_time_keyboard": true
            }
        });
    } catch (e) {
        console.log(new Date() + 'main menu: ' + e);
    }
};