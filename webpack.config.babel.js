/**
 * Copyright 2018 SME Virtual Network Contributors. All Rights Reserved.
 * Licensed under The MIT License.
 * =============================================================================
 */

import autoprefixer from "autoprefixer";
import path from "path";
import log from "fancy-log";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

log.warn("[Webpack] build mode: ", IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT");

const minimizerSettings = [];

if (IS_PRODUCTION) {
  minimizerSettings.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    })
  );
}

export default {
  mode: IS_PRODUCTION ? "production" : "development",

  entry: {
    main: ["./src/scripts/index.ts"]
  },

  devtool: IS_PRODUCTION ? "source-map" : "inline-source-map",

  externals: {},

  output: {
    filename: IS_PRODUCTION ? "[name].min.[hash].js" : "[name].js",
    sourceMapFilename: IS_PRODUCTION ? "[name].min.[hash].map" : "[name].map",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist")
  },

  resolve: {
    extensions: [".ts", ".js", ".scss"]
  },

  optimization: {
    minimizer: minimizerSettings
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ["> 1%", "last 2 versions"]
                })
              ]
            }
          },
          "sass-loader?sourceMap"
        ]
      },
      {
        test: /(\.js$|\.ts(x?)$)/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: "index.html",
      template: "./src/index.html"
    })
  ]
};
