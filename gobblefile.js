const gobble = require("gobble")

const statik = gobble("static")

const css = gobble("less/")
  .transform("less", {
    src: "main.less",
    dest: "main.css"
  })
  .transform("postcss", {
    plugins: [
      require("autoprefixer")({browsers: ["> 1%", "last 4 versions"]}),
      require("cssnano"),
    ],
    map: false
  })

module.exports = gobble([statik, css])
