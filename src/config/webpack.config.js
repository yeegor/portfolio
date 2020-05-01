const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const projectRoot = path.resolve(__dirname, '..', '..');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: path.join(projectRoot, 'src', 'app', 'index.tsx'),

    output: {
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(projectRoot, 'assets', 'index.html')
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                REBEM_MOD_DELIM: JSON.stringify('_')
            }
        }),
        new Dotenv()
    ],

    resolve: {
        alias: {
            Route: path.resolve(projectRoot, 'src', 'app', 'route'),
            Component: path.resolve(projectRoot, 'src', 'app', 'component'),
            Style: path.resolve(projectRoot, 'src', 'app', 'style'),
            Util: path.resolve(projectRoot, 'src', 'app', 'util'),
            Request: path.resolve(projectRoot, 'src', 'app', 'request')
        },
        extensions: ['.js', '.scss', '.tsx']
    },

    devServer: {
        watchContentBase: true,
        historyApiFallback: true
    }
};
