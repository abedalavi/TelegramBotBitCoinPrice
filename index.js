const request = require("request");
const mysql = require("mysql");
const fs = require("fs");
var CronJob = require("cron").CronJob;
const TelegramBot = require("node-telegram-bot-api");
const adverID = "@advertisingmanger";
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
    host: "localhost",
    user: "alavibo1_bitcoin_user",
    password: "@Lavi2019087",
    database: "alavibo1_bitcoin",
    multipleStatements: true,
});
///////////////////////////////////////////////////////////////////////
const bot = new TelegramBot(token, {
    polling: {
        params: {
            offset: -1,
        },
    },
});
///////////////////////////////////////////////////////
process.on("uncaughtException", (ex) => {
    console.log(new Date() + ": Uncaught Exception: " + ex.message);
});
process.on("unhandledRejection", (ex) => {
    console.log(new Date() + ": Unhandled Rejection: " + ex);
});
bot.on("polling_error", (error) => {
    console.log(new Date() + `Polling error` + error); // => 'EFATAL'
});
process.on("exit", (code) => {
    console.log(new Date() + `Process exit event with code: `, code);
    bot.sendMessage(abedID, new Date() + `: Procees Exited!`);
});
bot.sendMessage(abedID, new Date() + ": Program Started!").catch((e) => {});
///////////////////////////////job for crypto//////////////////////////////////////////
var job1 = new CronJob(
    "*/5 * * * *",
    function () {
        request(
            "http://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DOGE&tsyms=USD&api_key=40c6a434d7e306a35fa81943078ca30b652be0a09dce8fdc5f38399fc2169ef3",
            {
                json: true,
            },
            (err, res, body) => {
                if (err) {
                    console.log(err);
                    bot.sendMessage(abedID, err);
                }
                let BTC = res.body.BTC.USD;
                let ETH = res.body.ETH.USD;
                let LTC = res.body.LTC.USD;
                let DOGE = res.body.DOGE.USD;
                bot.sendMessage(
                    `@bitcoin_gheymat`,
                    `Bitcoin: ${BTC} 💲 USD\n\nEthereum: ${ETH} 💲 USD\n\nLitecoin: ${LTC} 💲 USD\n\nDogecoin: ${DOGE} 💲 USD\n\n👉@bitcoin_gheymat`
                );
                bot.sendMessage(
                    `@ahuraprice`,
                    `Bitcoin: ${BTC} 💲 USD\n\nEthereum: ${ETH} 💲 USD\n\nLitecoin: ${LTC} 💲 USD\n\nDogecoin: ${DOGE} 💲 USD\n\n👉@bitcoin_gheymat`
                );
                console.log(new Date() + `cryptocurrency successfully posted!`);
            }
        );
    },
    null,
    true,
    "America/Los_Angeles"
);
job1.start();
///////////////////////////////job for currency//////////////////////////////////////////
var job2 = new CronJob(
    "32 * * * *",
    async function () {
        request(
            "https://openexchangerates.org/api/latest.json?app_id=14d883a9fcd8479ca6160514385ffd3f",
            {
                json: true,
            },
            async (err, res, body) => {
                if (err) {
                    console.log(err);
                    bot.sendMessage(abedID, err);
                }
                let r = res.body.rates;
                let msg = `یک دلار آمریکا برابر است با 👇\n 🇪🇺 EUR: ${r.EUR} یورو \n 🏴󠁧󠁢󠁥󠁮󠁧󠁿 GBP: ${r.GBP} پوند انگلستان \n 🇨🇦 CAD: ${r.CAD} دلارکانادا \n 🇦🇺 AUD: ${r.AUD} دلاراسترالیا \n 🇳🇿 NZD: ${r.NZD} دلارنیوزیلند \n 🇨🇳 CNY: ${r.CNY} یوهان چین \n 🇯🇵 JPY: ${r.JPY} ین ژاپن \n 🇨🇭 CHF: ${r.CHF} فرانک سوئیس \n 🇸🇪 SEK: ${r.SEK} کرون سوئد \n 🇳🇴 NOK: ${r.NOK} کرون نروژ \n 🇩🇰 DKK: ${r.DKK} کرون دانمارک \n 🇹🇷 TRY: ${r.TRY} لیر ترکیه \n 🇬🇪 GEL: ${r.GEL} لاری گرجستان \n 🇦🇲 AMD: ${r.AMD} درام ارمنستان \n 🇦🇿 AzN: ${r.AZN} منات آذربایجان \n 🇹🇲 TMM: ${r.TMT} منات ترکمنستان \n 🇦🇫 AFN: ${r.AFN} افغانی افغانستان \n 🇵🇰 PKR: ${r.PKR} روپیه پاکستان \n 🇮🇳 INR: ${r.INR} روپیه هند \n 🇸🇦 SAR: ${r.SAR} ریال صعودی \n 🇮🇶 IQD: ${r.IQD} دینار عراق \n 🇶🇦 QAR: ${r.QAR} ریال قطر \n 🇦🇪 AED: ${r.AED} درهم امارات \n 🇴🇲 OMR: ${r.OMR} دینار عمان \n 🇧🇭 BHD: ${r.BHD} دینار بحرین \n 🇰🇼 KWD: ${r.KWD} دینار کویت \n 🇸🇾 SYP: ${r.SYP} لیر سوریه \n 🇲🇾 MYR: ${r.MYR} رینگت مالزی \n 🇹🇭 THB: ${r.THB} بت تایلند \n\n👉@bitcoin_gheymat `;
                await bot.sendMessage(`@bitcoin_gheymat`, msg);
                await bot.sendMessage(`@ahuraprice`, msg);
                // bot.pinChatMessage("@bitcoin_gheymat", res1.message_id);
                console.log(new Date() + `exchange successfully posted!`);
            }
        );
    },
    null,
    true,
    "America/Los_Angeles"
);
job2.start();
////////////////////start/////////////////
bot.onText(/\/start/, async (msg) => {
    if (checkPrivate(msg)) {
        try {
            await bot.sendMessage(msg.from.id, "خوش آمدید");
            mainMenu(msg.from.id);
        } catch (e) {
            console.log(new Date() + "/start error: " + e);
        }
    }
});
////////////////////checkPrivate/////////////////
function checkPrivate(msg) {
    if (msg.chat.type === "private") return true;
    else return false;
}
//////////////////main menu/////////////////////
async function mainMenu(id) {
    try {
        await bot.sendMessage(id, "منوی اصلی", {
            parse_mode: "Markdown",
            reply_markup: {
                keyboard: [
                    [`روش نصب coinomi`, `دربارۀ بیت‌کوین`, "احراز هویت"],
                ],
                one_time_keyboard: true,
            },
        });
    } catch (e) {
        console.log(new Date() + "main menu: " + e);
    }
}
//////////////////////////احراز هویت ///////////
bot.onText(/احراز هویت$/, async (msg) => {
    try {
        if (await checkUserExist(msg.from.id)) {
            if (await checkUserAccepted(msg.from.id)) {
                bot.sendMessage(
                    msg.from.id,
                    `شما قبلا احرازهویت شده‌اید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n✅`
                );
                mainMenu(msg.from.id);
                return;
            } else if (!(await checkUserAccepted(msg.from.id))) {
                bot.sendMessage(
                    msg.from.id,
                    `شما قبلا احرازهویت کرده‌اید!\nلطفا منتظر تایید باشید!\nدر صورت نیاز به آیدی زیر پیام دهید!\n${adverID}\n❗️`
                );
                mainMenu(msg.from.id);
                return;
            }
        }
        setEhraz.add(msg.from.id);
        await bot.sendMessage(
            msg.from.id,
            `لطفا برای احرازهویت مطابق زیر یک عکس در همینجا ارسال کنید!\nعکس کارت ملی و کارت بانکی و متن مورد نظر را در یک دست گرفته و عکس تهیه کنید!\n✅`
        );
        await bot.sendPhoto(msg.from.id, "./auth.jpg");
        mainMenu(msg.from.id);
    } catch (e) {
        console.log(new Date() + "ehraz error: " + e.message);
        setEhraz.delete(msg.from.id);
    }
});
bot.on("photo", async (msg) => {
    try {
        if (setEhraz.has(msg.from.id)) {
            setEhraz.delete(msg.from.id);
            let result = await getQuery(
                "INSERT INTO `bitcoin_users` (`name`,`telegramid`,`telegramusername`,`isaccepted`)VALUES(?,?,?,?);",
                [
                    msg.from.first_name,
                    msg.from.id,
                    msg.from.username == undefined ? "" : msg.from.username,
                    0,
                ]
            );
            let captionOfImage = `آیدی:${result.insertId}\n نام: ${
                msg.from.first_name
            }\nیوزر تلگرامی:${
                msg.from.username == undefined ? "" : msg.from.username
            }\nآیدی تلگرامی:${msg.from.id}\nتاریخ ارسال:${new Date(
                msg.date * 1000
            ).toLocaleString("fa-IR")}`;
            await bot.sendPhoto(abedID, msg.photo[0].file_id, {
                caption: captionOfImage,
            });
            await bot.sendMessage(
                msg.from.id,
                `عکس دریافت شد!\nلطفا منتظر تایید باشید!\nدر صورت تایید یک پیام در همینجا به شما داده می‌شود و شما می‌توانید درخواست خرید و فروش بدهید!\n✅`
            );
        } else {
            await bot.deleteMessage(msg.chat.id, msg.message_id);
        }
        mainMenu(msg.from.id);
    } catch (e) {
        console.log(new Date() + "photo error: " + e.message);
    }
});
/////////////////////////روش نصب////////////////
bot.onText(/روش نصب/, async (msg) => {
    try {
        await bot.sendMessage(
            msg.from.id,
            `مراحل ساخت کیف پول کوینومی در موبایل\n قدم اول\nبرای شروع، باید به آپ استور یا گوگل پلی رفته و عبارت «Coinomi Wallet» را در آن جستجو کنید. پس از یافتن برنامه دکمه‌ی GET یا INSTALL را فشار داده و آن را روی تلفن همراه خود نصب کنید. همچنین می توانید با مراجعه به صفحه دانلود سایت رسمی Coinomi فایل را مستقیما دریافت کنید.\n✅`
        );
        await bot
            .sendPhoto(msg.from.id, `./b1.jpg`)
            .catch((e) => console.log(e));
        await bot.sendMessage(
            msg.from.id,
            `توجه: در این بخش اگر از قبل کیف پول کوینومی داشته‌اید، می‌توانید با فشردن گزینه‌ی «Restore a wallet» آن را بازیابی کنید. مراحل این کار در پایان توضیح داده خواهد شد.\nقدم سوم
پس از آن، صفحه‌ی عبارت بازیابی (Recovery Phrase) را مشاهده خواهید کرد. در این مرحله، برای اطمینان از سخت بودن عبارت بازیابی خود، حتماً گزینه‌ی ۲۴ کلمه‌ای (پارانویید) را انتخاب کنید. دقت داشته باشید که عبارت را به طور کامل و به ترتیب روی تکه‌ای کاغذ یادداشت کرده و از آن به خوبی نگهداری کنید. سپس گزینه‌ی دایره‌ای پایین صفحه را انتحاب کرده و Next  را بزنید. اخطاری را نیز مشاهده خواهید کرد که می‌گوید «اگر عبارت بازیابی خود را گم کنید، دیگر نمی‌توانید کیف پولتان را بازیابی کنید».
توجه: برای ذخیره‌ی عبارت بازیابی، از صفحه‌ی گوشی خود اسکرین شات نگیرید زیرا خود برنامه نیز به شما این اخطار را می‌دهد که روش امنی نخواهد بود.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b2.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `قدم چهارم
پس از آن باید عبارت بازیابی را وارد و دکمه‌ی Next را فشار دهید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b3.jpg`);
        await bot.sendPhoto(msg.from.id, `./b4.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `قدم پنجم
پسوردی را برای استفاده روزانه‌ی خود انتخاب کنید. این پسورد باید بین ۱۰ تا ۲۸ حرف باشد. سپس، Next را بزنید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b5.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `قدم ششم
در بخش بعدی شما می‌توانید کوین‌هایی که می‌خواهید بیفزایید و استفاده کنید را انتخاب کنید. حتی اگر نمی‌دانید به غیر از بیت کوین از چه ارز دیجیتال دیگری استفاده خواهید کرد، نگران نباشید، می‌توانید متعاقباً آن‌ها را اضافه کنید.\n✅`
        );
        await bot.sendMessage(
            msg.from.id,
            `قدم هفتم
دکمه‌ی پذیرش (Accept) شرایط و مقررات سرویس‌دهی (Terms of Services) را فشرده و به مرحله‌ی بعد بروید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b7.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `اگر می‌خواهید ارز دیجیتال جدیدی را اضافه کنید، روی گزینه‌ Coin+ که در پایین صفحه قرار دارد، کلیک کنید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b8.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `در این مرحله، ایجاد کیف پول به پایان می‌رسد. اکنون به بررسی برخی گزینه‌های این کیف پول می‌پردازیم.
یکی از ویژگی‌های خوب این برنامه آن است که می‌توانید با توجه به ارز رایج دلخواهتان، قیمت ارزهای دیجیتال را مشاهده کنید. در این مرحله، پیغام دریافت اجازه برای ارسال هشدار از سوی این کیف پول را مشاهده خواهید کرد که با فشردن Allow این اجازه را به آن بدهید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b9.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `برای ارسال ارز دیجیتال، از گزینه‌ی سه خطی بالا سمت چپ، روی ارز دیجیتالی که قصد ارسال آن را دارید کلیک کنید و وارد تب ارسال (Send) شوید. در این بخش نیاز است تا آدرس مقصد و میزان مورد نظر برای ارسال را وارد کادرهای مربوطه کنید. از گزینه‌ی Scan QR Code نیز می‌توان استفاده کرد، بدین شکل که باید از بارکد آدرس مقصد عکس بگیرید. گزینه‌ی Use all funds نیز به معنی آن است که می‌توانید کل دارایی‌تان را یکجا ارسال کنید. پس از وارد کردن این اطلاعات، باید از صحت تک تک آن‌ها اطمینان حاصل کنید و سپس دکمه‌ی ارسال را فشار دهید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b10.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `پس از آن که تراکنش را ارسال کردید، باید منتظر تایید آن بمانید. وضعیت این تراکنش را می‌توانید در تب Balance مشاهده کنید. اگر روی تراکنش انجام شده کلیلک کنید، می‌توانید از جزییات آن مطلع شوید. برای مثال می‌توانید از تاریخ انجام، وضعیت آن، میزان جا به جا شده، کارمزد تراکنش و شناسه‌ی تراکنش با خبر شوید.\n✅`
        );
        await bot.sendMessage(
            msg.from.id,
            `برای دریافت ارز دیجیتال از دیگران، دوباره روی همان گزینه‌ی سه خطی کلیک کرده و این بار در منوی باز شده، روی کوین‌هایی که اضافه کرده بودید کلیک کنید. خواهید دید در تب Receive که در پایین قرار دارد، آدرسی برای شما نشان داده خواهد شد که در زیر آن نیز QR کد آن قرار دارد. این آدرس را کپی کرده و به فردی که می‌خواهید برایتان ارز دیجیتال بفرستد، ارسال کنید و یا آن را در صرافی که قصد ارسال ارز دیجیتالتان را از آن دارید، تایپ کنید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b11.jpg`);
        await bot.sendMessage(
            msg.from.id,
            `برای بررسی موجودی کیف پول خود، دوباره همان مراحل بالا را تکرار کنید، اما این بار به جای تب Receive وارد تب Balance شوید. در این بخش تمام تراکنش‌های انجام شده را خواهید دید.\n✅`
        );
        await bot.sendPhoto(msg.from.id, `./b12.jpg`);
        mainMenu(msg.from.id);
    } catch (e) {
        console.log(new Date() + e.message);
    }
});
/////////////////////////درباره بیت کوین
bot.onText(/دربارۀ بیت‌کوین/, async (msg) => {
    try {
        bot.sendMessage(
            msg.from.id,
            `بیت کوین (به انگلیسی: Bitcoin؛نماد:BTC) یک رمزارز و نظام پرداخت جهانی با کارکردهای مشابه پول بی‌پشتوانه است، از نظر فنی بیت‌کوین نخستین پول دیجیتال غیرمتمرکز است. چرا که بدون بانک مرکزی یا مسئول مرکزی کار می‌کند. این شبکه همتابه‌همتا است و تراکنش‌ها، مستقیماً و بدون واسطه بین کاربران انجام می‌شود.
به زبان ساده، بیت کوین، یک ارز و پول دیجیتال و همچنین یک شبکه برای پرداخت‌های مستقیم و بدون واسطه است.
        
تعریف بیت کوین (Bitcoin)
        
بیت کوین (به انگلیسی:Bitcoin) با علامت BTC یک واحد پول مجازی است که تماما در اینترنت قرار دارد و از سیستم رمز نویسی خاصی استفاده می کند که باعث می شود بدون نیاز به نهاد مرکزی (مانند بانک مرکزی) و کاملا مستقل فعالیت کند.`
        );
        mainMenu(msg.from.id);
    } catch (e) {
        console.log(new Date() + e.message);
    }
});

//////////////getQuery////////////////////
function getQuery(query, params) {
    return new Promise((resolve, reject) => {
        // console.log(query + params);
        pool.query(query, params, (err, res) => {
            if (err) {
                reject("Error on query: " + err.message);
            }
            resolve(res);
        });
    });
}
/////////////////////check user exist/////////////////////////////
async function checkUserExist(id) {
    let user = await getQuery(
        `select * from bitcoin_users where telegramid = ?`,
        [id]
    );
    if (user == "") {
        return false;
    }
    return true;
}
////////////////////check admin/////////////////////
function checkAdmin(id) {
    return id == abedID;
}
/////////////////////check user accepted //////////
async function checkUserAccepted(id) {
    let user = await getQuery(
        `select isaccepted from bitcoin_users where telegramid = ?`,
        [id]
    );
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
