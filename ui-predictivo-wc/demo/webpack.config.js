const path = require('path');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = env => {
  let config = {
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname,'./dist'),
      filename: 'index_bundle.js'
    },
    devServer: {
      host: "0.0.0.0",
      proxy: {
        '/tabit':{
          target: "http://tabit-epd.cm.es/api/1.0/sap/tabit/",
          pathRewrite: {"^/tabit" : ""}
        },
        /*'/tabit':{
            target: "http://tabit-epi.cm.es/api/tabit/",
            pathRewrite: {"^/tabit" : ""}
        },*/
        '/api': {
          target: "http://iob.ms.epi.bankia.int:41180/",
        },
        '/tas':{
          target: "http://tasap-epi.ms.bankia.int:8080/",
          pathRewrite: {"^/tas" : ""}
        },
        //'/buscemp':{target: "http://10.64.28.18:41192/", pathRewrite: {"^/buscemp" : ""}}
        '/buscemp':{target: "http://10.64.28.115:41192/", pathRewrite: {"^/buscemp" : ""}}
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader:'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {test: /\.js$/, use: ['source-map-loader'], enforce: "pre", include:[path.resolve(__dirname, "../lib/index.js")]},
        {
          test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
          use: [{
            loader: 'file-loader',
            options: { name: '[path][name].[ext]'}
          }]
        }
      ]
    },
    plugins: [
      new DuplicatePackageCheckerPlugin({ emitError: true }),
      HtmlWebpackPluginConfig
    ]
  };
  return config;
};