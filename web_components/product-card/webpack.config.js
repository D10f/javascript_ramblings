const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [new HtmlWebpackPlugin({ template: "./src/index.html" })];

let mode = "development";
let target = "web";
let devtool = "source-map";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
  devtool = false;
  plugins.push(
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
  );
} else {
  plugins.push(new MiniCssExtractPlugin({ filename: "[name].css" }));
}

module.exports = {
  mode: mode,
  target: target,
  entry: "./src/index",
  output: {
    filename: mode === "development" ? "[name].js" : "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(webm|mp4)$/i,
        type: "asset/resource",
        generator: {
          filename: "videos/[name][ext][query]",
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.(j|t)sx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[c|a]|c)ss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts"],
  },
  devtool: devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, "static"),
      publicPath: "/assets",
    },
    watchFiles: {
      paths: ["src/**/*"],
    },
    compress: false, // <- true is default
    hot: true, // <- true is default
  },
  optimization: {
    splitChunks: {
      chunks: mode === "production" ? "all" : "async",
    },
  },
};
