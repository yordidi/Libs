const webpack = require('webpack');
const { resolve } = require('path');

module.exports = function(env) {
	return {
		output: {
		  // the output bundle
		  path: resolve(__dirname, '../dist'),
		},
		module: {
		  	rules: [
			    {
		        test: /\.jsx?$/,
				    use: 'babel-loader',
				    exclude: /node_modules/
			    },
			    {
			      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			      use: [{
			      	loader:'url-loader',
			    	  options: {
			    	    limit: 10000,
			    	    name: 'images/[name].[hash:7].[ext]'
			    	  }
			    	}]
			    },
			    {
			      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			      use: [{
			      	loader:'url-loader',
			    	  options: {
			    	    limit: 10000,
			    	    name: 'fonts/[name].[hash:7].[ext]'
			    	  }
			    	}]
			    },
			    { 
			      test: /\.(svg)$/i, 
			      use: 'svg-sprite-loader', 
			      include: [
			            // resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
			          ]
		      }
		  	]
		},
		resolve: {
		  // modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
		  extensions: ['.web.js', '.js', '.json'],
		},
		
		plugins: [
			new webpack.DefinePlugin({
			    'process.env': {
			        'NODE_ENV': JSON.stringify( env == 'prod' ? 'production' : env)
			    }
			})
		]
	}
}