var webpack = require("webpack");
var path = require('path');
var helpers = require('./helpers');

module.exports = {
    resolve: {
        extensions: [".ts", ".js"],
    },
    
    output: {
        path: helpers.root("dist"),
        filename: "[name].js",
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            }
        ]
    },
};
