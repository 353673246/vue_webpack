const path = require('path')
const isDev = process.env.NODE_ENV === "development"
// console.log(isDev);
const createVueLoaderConfig = require('./vue-loader.config')
const config = {
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'../dist'),
        // publicPath: '/'
    },
    resolve:{
        extensions:["*",".vue",".js",".jsx"],
        alias:{
            vue$:"vue/dist/vue.common.js",
            "@":path.resolve(__dirname,"../src/components")
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|vue|jsx)$/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                enforce:'pre'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/,
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                exclude:/node_modules/,
                options:createVueLoaderConfig(isDev)
                // options:{
                //     extractCSS:!isDev
                // }
            },

            {
                test:/\.(jpg|png|jpeg|gif|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:1024,
                        name:'[name]-[hash:base64:8].[ext]'
                    }
                }
            },
        ]
    },

}
module.exports = config 