var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './entry.react.js',
  ],
  output: {
    filename: './dist/app.js',
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    root: [
      path.join(__dirname),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      $: 'jQuery',
    },
  },
  plugins: (process.env.NODE_ENV === 'production') ? [
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.ResolverPlugin(
    //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    // ),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin()
  ] :
  [],
  module: {
    loaders: [
      { test: /tether\.js$/, loader: "expose?Tether" },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel'},
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: `style!css!postcss` },
      { test: /\.scss$/, loader: `style!css!sass!postcss` },
      // { test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf)$/, loader: 'url?name=public/assets/[hash].[ext]' }
      { test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf)$/, loader: 'responsive' }
    ]
  },
  responsiveLoader: {
    sizes: [1600, 200]
  },
  postcss() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  }
};
