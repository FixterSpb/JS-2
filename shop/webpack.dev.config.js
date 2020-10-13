const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                    name: '[name].[ext]',
                },

                //use: ['file-loader']
            },

            {
                test: /\.(otf|eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    outputPath: 'fonts'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new CopyPlugin([
            {
                from: "src/public/img",
                to: "img/[name].[ext]",
                toType: 'template'
            },
            {
                from: "src/public/fonts",
                to: "fonts/[name].[ext]",
                toType: 'template'
            }
        ])
    ]
};
