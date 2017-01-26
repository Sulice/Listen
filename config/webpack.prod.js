var webpack = require("webpack");
var path = require('path');
var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    entry: {
        "app": helpers.root("app/","main.prod.ts"),
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [helpers.root("app"), helpers.root("aot"), helpers.root("node_modules")],
                use: ["awesome-typescript-loader?configFileName=tsconfig.prod.json", "angular2-template-loader"]
            },
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            // https://github.com/mishoo/UglifyJS2#compressor-options
            compress: {
                keep_fnames: false,
                dead_code: true,
                drop_debugger: true,
                evaluate: true,
                booleans: true,
                loops: true,
                join_vars: true,
                reduce_vars: true,
                drop_console: true,
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: true,
            sourceMap: true
        }),
        
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false // workaround for ng2
                },
            }
        }),
    ],

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
        modules: true,
        // Sort the modules by a field
        modulesSort: "field",
        // Add public path information
        publicPath: false,
        // Add information about the reasons why modules are included
        reasons: false,
        // Add the source code of modules
        source: false,
        // Add timing information
        timings: true,
        // Add webpack version information
        version: true,
        // Add warnings
        warnings: true
    },
});
