var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// 给出正确的绝对路径
function resolve (dir) {
  return path.join(__dirname,'..', dir)
}
// 配置webpack编译入口
module.exports = {
  entry: {
    app: './src/main.js'
  },
   // 配置webpack输出路径和命名规则
  output: {
  	 // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    filename: '[name].js',
     // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块resolve的规则
 // resolve配置用来影响webpack模块解析规则。解析规则也可以称之为检索，索引规则。
 //配置索引规则能够缩短webpack的解析时间，提升打包速度。
  resolve: {
  	// 自动resolve的扩展名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components':resolve('src/components'),
      'base':resolve('src/base'),
      'api':resolve('src/api')
    }
  },
   // resolve模块的时候要搜索的文件夹
  module: {
    rules: [
//    {
//      test: /\.(js|vue)$/,
//      loader: 'eslint-loader',
//      enforce: 'pre',
//      include: [resolve('src'), resolve('test')],
//      options: {
//        formatter: require('eslint-friendly-formatter')
//      }
//    },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
