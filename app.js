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
bot.hears('d', (ctx) => console.log(ctx.message.from.id));
bot.help((ctx) => ctx.reply(help.commands));

// Menu
bot.command('family', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Управление семьёй 👤</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Добавить ✅', 'btn_addFam'),
					Markup.button.callback('Удалить ❌', 'btn_addRem')],
				[Markup.button.callback('Показать список 📜', 'btn_listFam')]
			]
		))
	} catch (e) {
		console.error(e);
	}
})

bot.command('shopping', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Список покупок  🛒</b>', Markup.inlineKeyboard(
			[
				[Markup.button.callback('Добавить ✅', 'btnSHP_1'),
					Markup.button.callback('Удалить ❌', 'btnSHP_2')],
				[Markup.button.callback('Показать 📜', 'btnSHP_3'),
					Markup.button.callback('Отправить 📨', 'btnSHP_4')]
			]
		))
	} catch (e) {
		console.error(e);
	}
})

// Handlers
bot.action('btn_addFam', async ctx => {
	try {
		await ctx.answerCbQuery();
		console.log(ctx.user.id);
		//const sql = con.query("SELECT own_family FROM users WHERE id_tg === ")
	} catch (e) {
		console.error(e)
	}
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));