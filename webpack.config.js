const { Configuration } = require("webpack"); //结合下面的注释就有只能提示了
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
/**
 * @type {Configuration}
 */
const config = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(process.cwd(), "tsconfig.json"),
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  devServer: {
    port: 9009,
    hot: true,
    open: true,
    proxy: {

    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      extensions: [".vue", ".ts", ".js"],
    },
  },
  stats: "errors-only",// 关闭一些没用的提示
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here: http://localhost:8080']
      }
    })
  ],
  externals: {
    vue: 'Vue' // 做性能优化 在index.html加<script src="https://unpkg.com/vue@next"></script>
  }
};
module.exports = config;
