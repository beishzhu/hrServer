const Koa = require('koa')
const serve = require('koa-static')
const {
	historyApiFallback
} = require('koa2-connect-history-api-fallback')
const proxy = require('koa2-proxy-middleware')
const app = new Koa();
// 这句话意思 除了接口之外所有的请求都发送给了 index.html
app.use(historyApiFallback({
	whiteList: ['/prod-api'] //生产环境路径白名单不要帮我处理 自己处理
}))
// 注册跨域代理的中间件
app.use(proxy({
	targets: {
		// (.*) 意思是所有 代理以/prod-api开头的路径
		'/prod-api/(.*)': {
			target: 'http://ihrm-java.itheima.net/api', // 后端服务器地址
			changeOrigin: true, //允许跨域
			pathRewrite: {
				'/prod-api': ''
			}
		}
	}
}))
app.use(serve(__dirname + "/public")); // 将public下的代码静态化
app.listen(3333, () => {
	console.log('人资项目启动成功 访问地址：http://localhost:3333');
})
