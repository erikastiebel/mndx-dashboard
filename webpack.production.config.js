"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

module.exports = {
  entry: [
    path.join(__dirname, "/app/main.jsx"),
    path.join(__dirname, "app/styles/app.scss")
  ],
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "bundle.min.js",
    publicPath: "/"
  },
  resolve: {
   extensions: ["",".scss", ".js", ".jsx"],
 },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: "app/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    //new ExtractTextPlugin("app.min.scss"),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin("webpack.stats.json", {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  module: {
    "development": {
      loaders: [{
        query: {
          "presets": ["react-hmre"]
        }
      }]
    },
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        "presets": ["react", "es2015", "stage-0"]
      }
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        "presets": ["react", "es2015", "stage-0"]
      }
    },
    {
      test: /\.json?$/,
      loader: "json"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.scss$/,
      loader: "style!css!sass?sourceMap"

    }]
  },
  postcss: [
    require("autoprefixer")
  ]
};
