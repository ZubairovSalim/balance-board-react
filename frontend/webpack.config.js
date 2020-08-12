const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
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