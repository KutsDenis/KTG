const {
	Telegraf,
	Markup
} = require('telegraf');

const help = require('./src/const');
const mysql = require('mysql');

require('dotenv').config();
const env = process.env;

const con = mysql.createConnection({
	host: env.hostSQL,
	user: env.userSQL,
	password: env.passSQL,
	database: env.dbSQL
});

con.connect(function(err) {
	if (err) throw err;
	console.log("DB connected!");
});

const bot = new Telegraf(env.TOKEN);
bot.start((ctx) => ctx.reply('Welcome to the club, buddy...'));
bot.hears('md', (ctx) => console.log(ctx.message));
bot.help((ctx) => ctx.reply(help.commands));

bot.command('shopping', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Список покупок  🛒</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Добавить ✅', 'btn_1'),
					Markup.button.callback('Удалить ❌', 'btn_2')],
				[Markup.button.callback('Показать 📜', 'btn_3'),
					Markup.button.callback('Отправить 📨', 'btn_4')]
			]
		))
	} catch (e) {
		console.error(e);
	}
})

bot.action('btn_1', async ctx => {
	try {
		await ctx.answerCbQuery();
	} catch (e) {
		console.error(e)
	}
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));