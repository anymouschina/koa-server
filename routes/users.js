const GROUP_NAME = 'test'
const Joi = require('joi')
module.exports = [{
    method:'GET',
    path: `/${GROUP_NAME}/test1`,
    handler:(ctx,next)=>{
        console.log(ctx.request)
        console.log(ctx.request.querystring)
        console.log(ctx.response.header)
        ctx.body = {
            "status": 200,
            message:'111',
            type:'success',
            test:'ssdasduccess',
            body:{}
          }
    },
    config: {
        tags: ['api', GROUP_NAME],
        description: '获取用户列表',
        auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
        validate: {
          query: {
            // ...paginationDefine,
            test:Joi.string().required().description('测试')
          },
        }
    }
}]