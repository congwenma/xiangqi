const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js'
    //  can do vendor manually
    //  vendor: ['react', 'react-dom', 'rxjs']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets',

    // library: 'myClassName'
    // - will attach your bundle to a window.myClassName instance, so using that name scope, you could call methods available to that entry point.
  },

  devServer: {
    contentBase: path.resolve(__dirname, './src')
  },

  plugins: [
    // bundles main dependencies into one, avoiding duplicates
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,  // modules that get loaded 2 or more times will bundle into common.js
    }),

    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    })
  ],

  module: {
    rules: [
      // Babel + ES6
      // $ yarn add --dev babel-loader babel-core babel-preset-es2015
      // {
      //   test: /\.js$/,
      //   exclude: [/node_modules/],
      //   use: [{
      //     loader: 'babel-loader',
      //     options: { presets: ['es2015'] }
      //   }]
      // },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          // css module loader ( only scoped to local component )
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      },

      // sass
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader!sass-loader?importLoaders=1'
        })
      }
    ]
  },

  // give webpack a better understanding of intended module order
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
}
