"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "bootstrap-loader",
    path.join(__dirname, "app/main.jsx")
  ],
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
   extensions: ["", ".js", ".jsx"],
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new ExtractTextPlugin("/dist/app.min.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  module: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    },
    {
      test: /\.json?$/,
      loader: "json"
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", "css-loader?sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss")
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    },
    {
      test: /\.(woff|woff2)$/,
      loader: "url?prefix=font/&limit=5000"
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.gif/,
      loader: "url-loader?limit=10000&mimetype=image/gif"
    },
    {
      test: /\.jpg/,
      loader: "url-loader?limit=10000&mimetype=image/jpg"
    },
    {
      test: /\.png/,
      loader: "url-loader?limit=10000&mimetype=image/png"
    }]
  },
  postcss: [ autoprefixer() ]
};
