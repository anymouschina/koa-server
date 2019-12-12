const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const router = require('koa-router')(); /* 引入是实例化路由** 推荐*/
const routesUsers = require('./routes/users');
const registerRoutes = require('./utils/dealRoutes');
const config = require('./config/index');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const mongo = require('./models/index')
const schedule = require('node-schedule');

const  scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('30 * * * * *',()=>{
        console.log('scheduleCronstyle:' + new Date());
    }); 
}

// scheduleCronstyle();
const init = () => {
	mongo.register();//注册数据库
	app.use(koaStatic('static')); // 暴露swagger
	app.use(cors()); // 允许跨域
	app.use(bodyparser());
	app.use((ctx,next)=>{
		// console.log(ctx,'1222222222222')
		next();
	})
	registerRoutes(router, [...routesUsers], { host: `${config.host}:${config.port}` }); // 注册路由
	app.use(router.routes()); // 将路由加入服务
	app.listen(config.port); // 启动服务
	console.log('server is listenning 3000.....');
};
init();
