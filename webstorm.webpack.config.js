'use strict'
const path = require('path')

module.exports = {
    context: path.resolve(__dirname),
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            "@components": path.resolve("./src/components"),
            "@utils": path.resolve("./src/common/utils"),
            "@common": path.resolve("./src/common"),
        }
    }
}