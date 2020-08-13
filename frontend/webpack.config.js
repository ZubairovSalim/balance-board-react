const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                secure: false,
                changeOrigin: true
            }
        },
    },

    entry: {
        index: [
            // 'babel-polyfill',
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "index.js",
    },
    target: 'web',
    // plugins: [
    //     //     "transform-class-properties",
    //     "babel-plugin-transform-object-rest-spread"
    // ],
    module: {
        rules: [
            {
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /(node_modules)/,
                test: /\.js$/,
            },
            {
                //use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                test: /\.css$/,
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash]-[name].[ext]',
                            publicPath: 'build'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',

};