const path = require("path")
const abs = ([basePath]) => path.resolve(__dirname, basePath)

const data = require("./data")

module.exports = {
  entry: abs`src/index.pug`,
  context: __dirname,
  output: {
    path: abs`public`,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: file => {
                const parsed = path.parse(path.relative(abs`src`, file))
                parsed.ext = ".html"
                delete parsed.base
                return path.format(parsed)
              }
            }
          },
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"]
            }
          },
          {
            loader: "pug-html-loader",
            options: { data }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].css"
            }
          },
          "extract-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "stylus-loader",
            options: {
              define: {
                buttons: (({ buttons }) =>
                  buttons.map(button => [
                    button.slug,
                    button.backgroundColor.hex,
                    button.accentColor.hex,
                    button.image.url
                  ]))(data)
              },
              preferPathResolver: "webpack"
            }
          }
        ]
      },
      {
        test: /\.(png|svg)$/,
        exclude: abs`static`,
        enforce: "post",
        loader: "url-loader",
        options: {
          name: "[name].[hash].[ext]",
          limit: 1000
        }
      },
      {
        test: abs`static`,
        loader: "file-loader",
        options: {
          name: file => path.relative(abs`static`, file)
        }
      }
    ]
  }
}
