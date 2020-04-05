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
///////////////////////////////job for crypto//////////////////////////////////////////
var job1 = new CronJob('* * * * *', function () {
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
        bot.sendMessage(`@bitcoin_gheymat`,`Bitcoin: ${BTC} 💲 USD\n\nEthereum: ${ETH} 💲 USD\n\nLitecoin: ${LTC} 💲 USD\n\nDogecoin: ${DOGE} 💲 USD\n\n👉@bitcoin_gheymat`);
    });
}, null, true, 'America/Los_Angeles');
job1.start();
///////////////////////////////job for currency//////////////////////////////////////////
var job2 = new CronJob('32 * * * *', function () {
    request('https://openexchangerates.org/api/latest.json?app_id=14d883a9fcd8479ca6160514385ffd3f', {
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log(err);
            bot.sendMessage(abedID,err);
        }
        let r = res.body.rates;
        let msg = `یک دلار آمریکا برابر است با 👇\n 🇪🇺 EUR: ${r.EUR} یورو \n 🏴󠁧󠁢󠁥󠁮󠁧󠁿 GBP: ${r.GBP} پوند انگلستان \n 🇨🇦 CAD: ${r.CAD} دلارکانادا \n 🇦🇺 AUD: ${r.AUD} دلاراسترالیا \n 🇳🇿 NZD: ${r.NZD} دلارنیوزیلند \n 🇨🇳 CNY: ${r.CNY} یوهان چین \n 🇯🇵 JPY: ${r.JPY} ین ژاپن \n 🇨🇭 CHF: ${r.CHF} فرانک سوئیس \n 🇸🇪 SEK: ${r.SEK} کرون سوئد \n 🇳🇴 NOK: ${r.NOK} کرون نروژ \n 🇩🇰 DKK: ${r.DKK} کرون دانمارک \n 🇹🇷 TRY: ${r.TRY} لیر ترکیه \n 🇬🇪 GEL: ${r.GEL} لاری گرجستان \n 🇦🇲 AMD: ${r.AMD} درام ارمنستان \n 🇦🇿 AzN: ${r.AZN} منات آذربایجان \n 🇹🇲 TMM: ${r.TMM} منات ترکمنستان \n 🇦🇫 AFN: ${r.AFN} افغانی افغانستان \n 🇵🇰 PKR: ${r.PKR} روپیه پاکستان \n 🇮🇳 INR: ${r.IND} روپیه هند \n 🇸🇦 SAR: ${r.SAR} ریال صعودی \n 🇮🇶 IQD: ${r.IQD} دینار عراق \n 🇶🇦 QAR: ${r.QAR} ریال قطر \n 🇦🇪 AED: ${r.AED} درهم امارات \n 🇴🇲 OMR: ${r.OMR} دینار عمان \n 🇧🇭 BHD: ${r.BHD} دینار بحرین \n 🇰🇼 KWD: ${r.KWD} دینار کویت \n 🇸🇾 SYP: ${r.SYP} لیر سوریه \n 🇲🇾 MYR: ${r.MYR} رینگت مالزی \n 🇹🇭 THB: ${r.THB} بت تایلند \n\n👉@bitcoin_gheymat `;
        bot.sendMessage(`@bitcoin_gheymat`,msg);
    });
}, null, true, 'America/Los_Angeles');
job2.start();
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
//////////////////////////
