const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const projectRoot = path.resolve(__dirname, '..', '..');
const publicPath = path.resolve(projectRoot, 'src', 'config', 'public');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: path.join(projectRoot, 'src', 'app', 'index.tsx'),

    output: {
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    ...(() => {
        return isDevelopment
            ? {
                devServer: {
                    clientLogLevel: 'warning',
                    publicPath: '/',
                    watchContentBase: true,
                    historyApiFallback: true,
                },
                devtool: 'inline-source-map'
            }
            : null;
    })(),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(
                publicPath,
                isDevelopment ? 'index.development.html' : 'index.production.html'
            )
        }),

        new webpack.ProvidePlugin({
            React: 'react',
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
        }),

        new Dotenv(),
    ],

    resolve: {
        alias: {
            Route: path.resolve(projectRoot, 'src', 'app', 'route'),
            Component: path.resolve(projectRoot, 'src', 'app', 'component'),
            Style: path.resolve(projectRoot, 'src', 'app', 'style'),
            Util: path.resolve(projectRoot, 'src', 'app', 'util'),
            Request: path.resolve(projectRoot, 'src', 'app', 'request'),
        },
        extensions: ['.js', '.scss', '.tsx'],
    },
};
