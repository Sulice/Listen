var webpack = require("webpack");
var path = require('path');
var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
    entry: {
        "app": helpers.root("app/","main.dev.ts")
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [helpers.root("app"), helpers.root("node_modules")],
                use: ["awesome-typescript-loader?configFileName=tsconfig.dev.json", "angular2-template-loader"]
            },
        ]
    },

    stats: {
        // Add asset Information
        assets: false,
        // Sort assets by a field
        assetsSort: "field",
        // Add information about cached (not built) modules
        cached: false,
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,
        // Add built modules information to chunk information
        chunkModules: false,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Sort the chunks by a field
        chunksSort: "field",
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: false,
        // Add the hash of the compilation
        hash: false,
        // Add built modules information
        modules: false,
        // Sort the modules by a field
        modulesSort: "field",
        // Add public path information
        publicPath: false,
        // Add information about the reasons why modules are included
        reasons: false,
        // Add the source code of modules
        source: false,
        // Add timing information
        timings: false,
        // Add webpack version information
        version: false,
        // Add warnings
        warnings: false
    },
});
