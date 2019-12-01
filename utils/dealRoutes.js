const fs = require('fs')
function mapObj(obj,type){
    let newObj = []
    for(let key in obj){
        // console.log(obj[key])
        let nobj = {
            "name": key,
            "in": type,
            "description": obj[key]._description,
            "required": !!obj[key]._flags.presence,
            "type": obj[key]._type
        }
        newObj.push(nobj)
    }
    return newObj
}
module.exports = (router,routes,config)=>{
    let swaggerObj = {
        "swagger": "2.0",
        "info": {
            "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
            "version": "1.0.3",
            "title": "Swagger Petstore",
            "termsOfService": "http://swagger.io/terms/",
            "contact": {
                "email": "apiteam@swagger.io"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        "host": config.host,
        "basePath": "/api",
        "schemes": [
            "https",
            "http"
        ],
        "externalDocs": {
            "description": "Find out more about Swagger",
            "url": "http://swagger.io"
        },
        "definitions": {
            "ApiResponse": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "type": {
                        "type": "string"
                    },
                    "data": {
                        "type": "object"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            }
        },
        tags:[],
        paths:{}
    }
    let tags = []
    routes.map(item=>{
        router[item.method.toLowerCase()]('/api'+item.path,item.handler);
        swaggerObj.tags.indexOf(item.config.tags[1])===-1&&tags.push(item.config.tags[1]);
        let {summary,description,operationId,produces,validate} = item.config;
        if(this.toString.call(produces)!=='[object Array]')produces = []
        let parameters = [
            ...mapObj(validate.query,"query"),
            ...mapObj(validate.payload,"payload")]
        swaggerObj.paths[item.path] = {
            [item.method.toLowerCase()]:{tags:[item.config.tags[1]]},
            summary,description,operationId,
                "produces": [
                    "application/json",
                    "application/xml",
                    ...produces
                ],
                "parameters": parameters,
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": { 
                            "$ref": "#/definitions/ApiResponse"
                        }
                    },
                    "400": {
                        "description": "params is not accept"
                    },
                    "404": {
                        "description": "not found"
                    }
                }
        }
    })
    swaggerObj.tags = tags.map(item=>{
        return {
            "name": item,
            "description": `Everything about ${item}`,
            // "externalDocs": {
            //     "description": "Find out more",
            //     "url": "http://swagger.io"
            // }
        }
    })
    fs.writeFileSync('static/api/swagger-ui/swagger.json',JSON.stringify(swaggerObj),(err)=>{
        console.log(err,'??')
    })
}