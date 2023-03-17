1. 创建目录结构
2. 安装相关依赖
3. `pnpm webpack webpack-cli webpack-dev-server`
4. 还需要装一些webpack的插件` pnpm add html-webpack-plugin`
5. 环境搭建好之后装vue`pnpm add vue`
6. 安装loader处理vue的单文件组件` pnpm add vue-loader@next` `pnpm add @vue/compiler-sfc`
然后到webpack.config.js中去注册插件 
`const { VueLoaderPlugin } = require('vue-loader/dist/index')`
....省略很多代码
```
plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new VueLoaderPlugin(),  // 这里注册才能识别vue单文件组件
    new cleanWebpackPlugin()
  ]
```
....省略很多代码

7. 在webpack.config.js中配置支持vue的loader
```module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
```
8. 打包前清除一下dist目录
9. 解析css文件`pnpm add css-loader` `pnpm add style-loader`
10. 配置less`pnpm add less less-loader`
11. 安装完9 . 10配置webpack.config.js =>module=>rules中添加loader
```
{
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
```
11. 配置ts环境`pnpm add typescript` `pnpm add ts-loader`
配置webpack.config.js
```
{
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
            configFile: path.resolve(process.cwd(), "tsconfig.json"),
            appendTsSuffixTo: [/\.vue$/]
        }
      }
```
12. 接下来做一个美化webpack样式的功能,通过插件`pnpm add friendly-errors-webpack-plugin`
