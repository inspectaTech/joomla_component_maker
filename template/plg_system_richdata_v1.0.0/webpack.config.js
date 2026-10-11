
var path = require("path");
var webpack = require("webpack");
var path = require('path');
// console.log("process.env = ",process.env);
// console.log("path = ",path.resolve(__dirname, './js/lib/upload.js'));
// console.log("path2 = ",path.resolve(__dirname, 'js','lib','upload.js'));
// console.log("path3 = ",path.resolve(__dirname, '/js','/lib','/upload.js'));
// console.log("dirname = ",__dirname);
//console.log("path test process.env.PATH = ",process.env.PATH);
//var t_path = path.resolve(__dirname, './js/lib/upload.js');
// const isProd = NODE_ENV === 'production';
const isProd = process.env.npm_lifecycle_event === 'build';
// const ifProd = x => isProd && x;// when using babel
// const ifProd = function(x){return isProd && x;};
const prodObj = isProd ? {
    // this is the url of our local sourcemap server
    //publicPath:  'http://localhost:80/joomla/components/com_arc/xfiles/js/dist/',
    //publicPath:  path.join(__dirname,'js','dist'),
    //append: '\n//# sourceMappingURL=https://localhost:80/[url]',
    filename: '[file].map'
} : {};

module.exports = {
  /*optimization: {
    minimize: false
  },//this doesn't seem to be doing anything anymore
  */
  devtool: isProd ? false : 'cheap-module-eval-source-map',
  plugins:[
  new webpack.ProvidePlugin({
      /*$ : "jquery",
      jQuery : "jquery",*/
      test_es2015:path.join(__dirname,'src','lib','test_es2015.js')/* this works */,
      test_common:path.join(__dirname,'src','lib','test_common.js')/* this works */
    }),
    new webpack.SourceMapDevToolPlugin(prodObj)
  ]
}//module
