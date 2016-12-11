var webpack = require('webpack');
var path = require('path');
var AotPlugin = require('@ngtools/webpack').AotPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'app': './app/main.ts',
    },

    output: {
        path: 'dist',
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {

        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                include: "/app",
                use: "tslint-loader"
            },
            {
                test: /\.ts$/,
                use: "@ngtools/webpack",
            },
            {
                test: /\.scss$/,
                use: ["raw-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
        ]
    },

    plugins: [
        
        // ERRORS :
        // https://github.com/angular/angular-cli/issues/3241
        // https://github.com/angular/angular-cli/issues/2667
        // https://github.com/angular/angular-cli/issues/3157

        new webpack.LoaderOptionsPlugin({
            options: {

                // https://github.com/wbuchwalter/tslint-loader#usage
                tslint: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    },
                    typeCheck: false,
                    configFile: 'tsconfig.aot.json',
                    emitErrors: true,
                    failOnHint: true,        
                },
                
                context: path.resolve(__dirname, './'),          // must evaluate to root of project
            }
        }),

        new CleanWebpackPlugin(['dist'], {
            verbose: false, // say that it deletes dist/ directory
            dry: false, // when set to true, does nothing
        }),

        new webpack.NoErrorsPlugin(),

        //new webpack.optimize.UglifyJsPlugin({
        //    // https://github.com/mishoo/UglifyJS2#compressor-options
        //    compress: {
        //        keep_fnames: false,
        //        dead_code: true,
        //        drop_debugger: true,
        //        evaluate: true,
        //        booleans: true,
        //        loops: true,
        //        join_vars: true,
        //        reduce_vars: true,
        //        drop_console: true,
        //        warnings: false
        //    },
        //    output: {
        //        comments: false
        //    },
        //    mangle: true,
        //    sourceMap: false
        //}),
        
        new AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: './app/app.module#AppModule'
        }),
    ],
};

