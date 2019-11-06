const webpack = require('webpack');
const resolve = require('path').resolve;
const join = require('path').join;
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env) {
	return {
		output: {
		  filename: '[name].bundle.js',
		  // the output bundle
		  path: resolve(__dirname, '../dist'),
		},
		module: {
		  rules: [
		    {
		      test: /\.jsx?$/,
		      use: [ 'babel-loader', ],
		      exclude: /node_modules/
		    },
		    {
		      test: /\.css$/,
		      use: [ 'style-loader', 
		             'css-loader', 
		             'postcss-loader'
		            ],
		    },
		    {
		    	test: /\.(jpg|png)$/,
		    	use: "url-loader?limit=8192"
		    },
		    { 
		    	test: /\.(svg)$/i, 
		    	use: 'svg-sprite-loader', 
		    	include: [
		            // require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
		            // resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
		          ]
        },
		  ],
		},
		resolve: {
		  modules: [join(__dirname, '../node_modules'), 'node_modules'],
		  extensions: ['.web.js', '.js', '.json'],
		},
		
		
		plugins: [
			new webpack.DefinePlugin({
			    'process.env': {
			        'NODE_ENV': JSON.stringify(env)
			    }
			}),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: resolve(__dirname, "../views/index.html")
			})
		]
	}
}