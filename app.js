const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const router = require('koa-router')(); /*引入是实例化路由** 推荐*/
const routesUsers = require('./routes/users');
const registerRoutes = require('./utils/dealRoutes');
const config = require('./config/index');
const cors = require('koa2-cors');
const init = () => {
	registerRoutes(router, [...routesUsers], { host: '127.0.0.1:3000' }); //注册路由
	app.use(router.routes()); //将路由加入服务
	app.use(koaStatic('static')); //暴露swagger
	app.use(cors()); //允许跨域
	app.listen(config.port); //启动服务
	console.log('server is listenning 3000.....');
};
init();