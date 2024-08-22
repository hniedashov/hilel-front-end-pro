const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const distDir = path.resolve(__dirname, './dist');
const Handlebars = require("handlebars");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: distDir,
        publicPath: '/',
    },
    devServer: {
        static: distDir,
        port: 8080,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.hbs',
            partials: [path.join(__dirname, 'src', 'app', 'views', 'partials', '*.hbs')],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.hbs$/i,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [
                        path.join(__dirname, 'src/app/views', 'partials')
                    ]
                }
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, './src/app'),
            Pages: path.resolve(__dirname, './src/app/pages'),
            Routes: path.resolve(__dirname, './src/app/routes'),
            Controllers: path.resolve(__dirname, './src/app/controllers'),
            Views: path.resolve(__dirname, './src/app/views'),
        }
    }
};