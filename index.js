const request = require('request');
const mysql = require('mysql');
const fs = require('fs');
var CronJob = require('cron').CronJob;
const TelegramBot = require('node-telegram-bot-api');
const adverID = '@advertisingmanger';
const abedID = 922653106; //5051697
var setEhraz = new Set();
var setBuyBitcoin = new Set();
var setSellBitcoin = new Set();
var setBuyEth = new Set();
var setSellEth = new Set();
var callback_click = new Set();
/////////////local/////////////
// const token = '1029352844:AAEXUaoppERzW3ypp2OedZVZoIfXWY0tryo'; //@test_localabed_bot
// let pool = mysql.createPool({
//     connectionLimit: 50,
//     host: '127.0.0.1',
//     user: 'root',
//     password: '2019087',
//     database: 'alavibo1_bitcoin',
//     multipleStatements: true
// });
///////////// تلکابین 1 alavibot/////////////
const token = "1117341186:AAEdTNCuXyPHUCLOaDlQcQgEwCyijHCqoIg"; //bitcoin
let pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'alavibo1_bitcoin_user',
    password: '@Lavi2019087',
    database: 'alavibo1_bitcoin',
    multipleStatements: true
});
///////////////////////////////////////////////////////////////////////
const bot = new TelegramBot(token, {
    polling: {
        params: {
            offset: -1
        }
    },
});
///////////////////////////////////////////////////////
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
var job1 = new CronJob('*/5 * * * *', function () {
    request('http://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DOGE&tsyms=USD&api_key=40c6a434d7e306a35fa81943078ca30b652be0a09dce8fdc5f38399fc2169ef3', {
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log(err);
            bot.sendMessage(abedID, err);
        }
        let BTC = res.body.BTC.USD;
        let ETH = res.body.ETH.USD;
        let LTC = res.body.LTC.USD;
        let DOGE = res.body.DOGE.USD;
        bot.sendMessage(`@bitcoin_gheymat`, `Bitcoin: ${BTC} 💲 USD\n\nEthereum: ${ETH} 💲 USD\n\nLitecoin: ${LTC} 💲 USD\n\nDogecoin: ${DOGE} 💲 USD\n\n👉@bitcoin_gheymat`);
        console.log(new Date() + `cryptocurrency successfully posted!`);
    });
}, null, true, 'America/Los_Angeles');
job1.start();
///////////////////////////////job for currency//////////////////////////////////////////
var job2 = new CronJob('32 * * * *', async function () {
    request('https://openexchangerates.org/api/latest.json?app_id=14d883a9fcd8479ca6160514385ffd3f', {
        json: true
    }, async (err, res, body) => {
        if (err) {
            console.log(err);
            bot.sendMessage(abedID, err);
        }
        let r = res.body.rates;
        let msg = `یک دلار آمریکا برابر است با 👇\n 🇪🇺 EUR: ${r.EUR} یورو \n 🏴󠁧󠁢󠁥󠁮󠁧󠁿 GBP: ${r.GBP} پوند انگلستان \n 🇨🇦 CAD: ${r.CAD} دلارکانادا \n 🇦🇺 AUD: ${r.AUD} دلاراسترالیا \n 🇳🇿 NZD: ${r.NZD} دلارنیوزیلند \n 🇨🇳 CNY: ${r.CNY} یوهان چین \n 🇯🇵 JPY: ${r.JPY} ین ژاپن \n 🇨🇭 CHF: ${r.CHF} فرانک سوئیس \n 🇸🇪 SEK: ${r.SEK} کرون سوئد \n 🇳🇴 NOK: ${r.NOK} کرون نروژ \n 🇩🇰 DKK: ${r.DKK} کرون دانمارک \n 🇹🇷 TRY: ${r.TRY} لیر ترکیه \n 🇬🇪 GEL: ${r.GEL} لاری گرجستان \n 🇦🇲 AMD: ${r.AMD} درام ارمنستان \n 🇦🇿 AzN: ${r.AZN} منات آذربایجان \n 🇹🇲 TMM: ${r.TMT} منات ترکمنستان \n 🇦🇫 AFN: ${r.AFN} افغانی افغانستان \n 🇵🇰 PKR: ${r.PKR} روپیه پاکستان \n 🇮🇳 INR: ${r.INR} روپیه هند \n 🇸🇦 SAR: ${r.SAR} ریال صعودی \n 🇮🇶 IQD: ${r.IQD} دینار عراق \n 🇶🇦 QAR: ${r.QAR} ریال قطر \n 🇦🇪 AED: ${r.AED} درهم امارات \n 🇴🇲 OMR: ${r.OMR} دینار عمان \n 🇧🇭 BHD: ${r.BHD} دینار بحرین \n 🇰🇼 KWD: ${r.KWD} دینار کویت \n 🇸🇾 SYP: ${r.SYP} لیر سوریه \n 🇲🇾 MYR: ${r.MYR} رینگت مالزی \n 🇹🇭 THB: ${r.THB} بت تایلند \n\n👉@bitcoin_gheymat `;
        let res1 = await bot.sendMessage(`@bitcoin_gheymat`, msg);
        bot.pinChatMessage('@bitcoin_gheymat', res1.message_id);
        console.log(new Date() + `exchange successfully posted!`);
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
                    ["خرید ارز", `فروش ارز`, "فروش کیف پول سخت‌افزاری"],

                ],
                "one_time_keyboard": true
            }
        });
    } catch (e) {
        console.log(new Date() + 'main menu: ' + e);
    }
};
////////////////////////////فروش کیف پول سخت‌افزاری///////////
bot.onText(/فروش کیف پول سخت‌افزاری$/, async (msg) => {
    try {
        if (!await checkUserExist(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `شما هنوز احرازهویت انجام نداده‌اید!\nلطفا بر روی گزینۀ احرازهویت بزنید!\n❗️`)
            return;
        } else if (await checkUserExist(msg.from.id)) {
            if (!await checkUserAccepted(msg.from.id)) {
                await bot.sendMessage(msg.from.id, `هنوز احرازهویت شما تایید نشده است!\nلطفا منتظر تایید باشید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n❗️`)
                return;
            } else if (await checkUserAccepted(msg.from.id)) {
                let user = await getQuery(`select * from bitcoin_users where telegramid = ?`, [msg.from.id]);
                await bot.sendMessage(msg.from.id, `درخواست شما ارسال شد!\nلطفا منتظر بمانید!\n✅`);
                await bot.sendMessage(abedID, `آیدی شمارۀ ${user[0].id}\nنام کاربری تلگرامی:@${user[0].telegramusername} \n درخواست خرید کیف پول سخت‌افزاری را دارد!`);
            }
        }
    } catch (e) {
        console.log(new Date() + 'hardware wallet error: ' + e.message);
    }
});
//////////////////////////فروش ارز //////////
bot.onText(/فروش ارز$/, async (msg) => {
    try {
        await bot.sendMessage(msg.from.id, `لطفا ارز مورد نظر را انتخاب کنید!`, {
            "parse_mode": "Markdown",
            "reply_markup": {
                "inline_keyboard": [
                    [{
                        "text": `بیت کوین`,
                        "callback_data": `sellbitcoin,${msg.from.id}`
                    }],
                    [{
                        "text": `اتریوم`,
                        "callback_data": `selleth,${msg.from.id}`
                    }]
                ]
            }
        });
    } catch (e) {
        console.log(new Date() + 'foroosh error: ' + e.message);
    }
});
//////////////////////////خرید ارز //////////
bot.onText(/خرید ارز$/, async (msg) => {
    try {
        if (!await checkUserExist(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `شما هنوز احرازهویت انجام نداده‌اید!\nلطفا بر روی گزینۀ احرازهویت بزنید!\n❗️`)
            return;
        } else if (await checkUserExist(msg.from.id)) {
            if (!await checkUserAccepted(msg.from.id)) {
                await bot.sendMessage(msg.from.id, `هنوز احرازهویت شما تایید نشده است!\nلطفا منتظر تایید باشید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n❗️`)
                return;
            } else if (await checkUserAccepted(msg.from.id)) {
                await bot.sendMessage(msg.from.id, `لطفا ارز مورد نظر را انتخاب کنید!`, {
                    "parse_mode": "Markdown",
                    "reply_markup": {
                        "inline_keyboard": [
                            [{
                                "text": `بیت کوین`,
                                "callback_data": `buybitcoin,${msg.from.id}`
                            }],
                            [{
                                "text": `اتریوم`,
                                "callback_data": `buyeth,${msg.from.id}`
                            }]
                        ]
                    }
                });
                return;
            }
        }
    } catch (e) {
        console.log(new Date() + 'kharid error: ' + e.message);

    }
});
///////////////////////////call back
bot.on('callback_query', async (msg) => {
    try {
        if (callback_click.has(msg.from.id)) {
            return;
        } else {
            callback_click.add(msg.from.id);
            let telegramId = msg.from.id;
            let command = msg.data;
            if (command.indexOf('sell') != -1) {
                if (command.indexOf('bitcoin') != -1) {
                    clearSets(telegramId);
                    setSellBitcoin.add(telegramId);
                    bot.sendMessage(telegramId, `لطفا مقدار بیت‌کوین مورد نظر برای فروش را وارد کنید!\n✅`);
                    bot.answerCallbackQuery(msg.id, {
                        text: `لطفا مقدار بیت‌کوین مورد نظر برای فروش را وارد کنید`
                    });
                } else if (command.indexOf('eth') != -1) {
                    clearSets(telegramId);
                    setSellEth.add(telegramId);
                    bot.sendMessage(telegramId, `لطفا مقدار اتریوم مورد نظر برای فروش را وارد کنید!\n✅`);
                    bot.answerCallbackQuery(msg.id, {
                        text: `لطفا مقدار اتریوم مورد نظر برای فروش را وارد کنید`
                    });
                }
            } else if (command.indexOf('buy') != -1) {
                if (command.indexOf('bitcoin') != -1) {
                    clearSets(telegramId);
                    setBuyBitcoin.add(telegramId);
                    bot.sendMessage(telegramId, `لطفا مقدار بیت‌کوین مورد نظر برای خرید را وارد کنید!\n✅`);
                    bot.answerCallbackQuery(msg.id, {
                        text: `لطفا مقدار بیت‌کوین مورد نظر برای خرید را وارد کنید`
                    });
                } else if (command.indexOf('eth') != -1) {
                    clearSets(telegramId);
                    setBuyEth.add(telegramId);
                    bot.sendMessage(telegramId, `لطفا مقدار اتریوم مورد نظر برای خرید را وارد کنید!\n✅`);
                    bot.answerCallbackQuery(msg.id, {
                        text: `لطفا مقدار اتریوم مورد نظر برای خرید را وارد کنید`
                    });
                }
            }
            callback_click.delete(msg.from.id);
            bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        } // end if callback_click
    } catch (e) {
        console.log(new Date() + 'callback error: ' + e.message);
        callback_click.delete(msg.from.id);
    }
})
////////////////////////عدد///////////////
bot.onText(/^\d+$/, async (msg) => {
    try {
        let user = await getQuery(`select * from bitcoin_users where telegramid = ?`, [msg.from.id]);
        if (setBuyBitcoin.has(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `درخواست شما ارسال شد!\nلطفا منتظر بمانید!\n✅`);
            await bot.sendMessage(abedID, `آیدی شمارۀ ${user[0].id}\nنام کاربری تلگرامی:@${user[0].telegramusername} \n درخواست خرید مقدار ${msg.text} بیت کوین را دارد!`);
        } else if (setBuyEth.has(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `درخواست شما ارسال شد!\nلطفا منتظر بمانید!\n✅`);
            await bot.sendMessage(abedID, `آیدی شمارۀ ${user[0].id}\nنام کاربری تلگرامی:@${user[0].telegramusername} \n درخواست خرید مقدار ${msg.text} اتریوم را دارد!`);
        } else if (setSellBitcoin.has(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `درخواست شما ارسال شد!\nلطفا منتظر بمانید!\n✅`);
            await bot.sendMessage(abedID, `آیدی شمارۀ ${user[0].id}\nنام کاربری تلگرامی:@${user[0].telegramusername} \n درخواست فروش مقدار ${msg.text} بیت کوین را دارد!`);
        } else if (setSellEth.has(msg.from.id)) {
            await bot.sendMessage(msg.from.id, `درخواست شما ارسال شد!\nلطفا منتظر بمانید!\n✅`);
            await bot.sendMessage(abedID, `آیدی شمارۀ ${user[0].id}\nنام کاربری تلگرامی:@${user[0].telegramusername} \n درخواست فروش مقدار ${msg.text} اتریوم را دارد!`);
        } else {
            await bot.deleteMessage(msg.chat.id, msg.message_id);
        }
        clearSets(msg.from.id);
    } catch (e) {
        console.log(new Date() + 'digit error: ' + e.message);
        clearSets(msg.from.id);
    }
})
//////////////////////////احراز هویت ///////////
bot.onText(/احراز هویت$/, async (msg) => {
    try {
        if (await checkUserExist(msg.from.id)) {
            if (await checkUserAccepted(msg.from.id)) {
                bot.sendMessage(msg.from.id, `شما قبلا احرازهویت شده‌اید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n✅`)
                return;
            } else if (!await checkUserAccepted(msg.from.id)) {
                bot.sendMessage(msg.from.id, `شما قبلا احرازهویت کرده‌اید!\nلطفا منتظر تایید باشید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n❗️`)
                return;
            }
        }
        setEhraz.add(msg.from.id);
        await bot.sendMessage(msg.from.id, `لطفا برای احرازهویت مطابق زیر یک عکس در همینجا ارسال کنید!\nعکس کارت ملی و کارت بانکی و متن مورد نظر را در یک دست گرفته و عکس تهیه کنید!\n✅`);
        await bot.sendPhoto(msg.from.id, './auth.jpg')
    } catch (e) {
        console.log(new Date() + 'ehraz error: ' + e.message);
        setEhraz.delete(msg.from.id);
    }
});
bot.on('photo', async (msg) => {
    try {
        if (setEhraz.has(msg.from.id)) {
            setEhraz.delete(msg.from.id);
            let result = await getQuery("INSERT INTO `bitcoin_users` (`name`,`telegramid`,`telegramusername`,`isaccepted`)VALUES(?,?,?,?);", [msg.from.first_name, msg.from.id, msg.from.username == undefined ? '' : msg.from.username, 0]);
            let captionOfImage = `آیدی:${result.insertId}\n نام: ${msg.from.first_name}\nیوزر تلگرامی:${msg.from.username == undefined ? '' : msg.from.username}\nآیدی تلگرامی:${msg.from.id}\nتاریخ ارسال:${new Date(msg.date * 1000).toLocaleString('fa-IR')}`;
            await bot.sendPhoto(abedID, msg.photo[0].file_id, {
                caption: captionOfImage
            });
            await bot.sendMessage(msg.from.id, `عکس دریافت شد!\nلطفا منتظر تایید باشید!\nدر صورت تایید یک پیام در همینجا به شما داده می‌شود و شما می‌توانید درخواست خرید و فروش بدهید!\n✅`);
        } else {
            await bot.deleteMessage(msg.chat.id, msg.message_id);
        }
    } catch (e) {
        console.log(new Date() + 'photo error: ' + e.message);
    }
})
////////////////////////t ///////////
bot.onText(/^t\s*\d+\s*$/i, async (msg) => {
    try {
        if (checkAdmin(msg.from.id)) {
            let id = msg.text.substr(1).trim();
            let result = await getQuery("update bitcoin_users set isaccepted = 1 where id = ?", [id]);
            console.log(result);
            if (result.affectedRows == 0) {
                await bot.sendMessage(abedID, `کاربر مورد نظر یافت نشد!\n✅`);
                return;
            } else {
                await bot.sendMessage(abedID, `کاربر شمارۀ ${id} تایید شد!\n✅`);
                let user = await getQuery(`select * from bitcoin_users where id = ?`, [id]);
                await bot.sendMessage(user[0].telegramid, `احراز هویت شما با موفقیت انجام شد!\nاکنون می‌توانید درخواست خرید و فروش بدهید!\n✅`);
            }
        }
    } catch (e) {
        console.log(new Date() + 't error' + e.message);
    }
})
////////////////////getQuery////////////////////
function getQuery(query, params) {
    return new Promise((resolve, reject) => {
        // console.log(query + params);
        pool.query(query, params, (err, res) => {
            if (err) {
                reject('Error on query: ' + err.message);
            }
            resolve(res);
        });
    });
};
/////////////////////check user exist/////////////////////////////
async function checkUserExist(id) {
    let user = await getQuery(`select * from bitcoin_users where telegramid = ?`, [id]);
    if (user == '') {
        return false;
    }
    return true;
}
////////////////////check admin/////////////////////
function checkAdmin(id) {
    return (id == abedID)
}
/////////////////////check user accepted //////////
async function checkUserAccepted(id) {
    let user = await getQuery(`select isaccepted from bitcoin_users where telegramid = ?`, [id]);
    if (user[0].isaccepted == 0) {
        return false;
    }
    return true;
}
////////////////////clear////////////////////
function clearSets(id) {
    setBuyBitcoin.delete(id);
    setBuyEth.delete(id);
    setSellBitcoin.delete(id);
    setSellEth.delete(id);
}