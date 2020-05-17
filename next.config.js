const dotenv = require("dotenv").config()

module.exports = {
  env: { ...dotenv.parsed },
}
