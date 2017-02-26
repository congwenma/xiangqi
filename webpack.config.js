const path = require('path');
const webpack = require('webpack');


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
    publicPath: '/assets'
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
  ],
}
