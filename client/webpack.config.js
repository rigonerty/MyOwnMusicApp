const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require("path")


module.exports = {
    entry: path.resolve(__dirname, "src", "index.tsx"),

    devServer:{
        historyApiFallback: true,
        watchFiles: path.resolve(__dirname, "src"),
        port: 3000,
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "index.[contenthash].js",
        assetModuleFilename: path.join("img" , "[name].[contenthash][ext]" )
    },

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, "public", "index.html")
            }
        ),
        new FileManagerPlugin({
            events: {
                onStart:{
                    delete:["dist"]
                },
                onEnd:{
                    copy:[
                        {
                            source: path.join("src","static"),
                            destination:"dist"
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "index.[contenthash].css"
        })],

    module:{
        rules:[
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test:/\.(scss|css)$/,
                use:[MiniCssExtractPlugin.loader, "css-modules-typescript-loader" ,"css-loader", "postcss-loader","sass-loader"]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "img/[name].[contenthash][ext]"
                }
            },
            {
                test: /\.(svg)$/i,
                type: "asset/resource",
                generator:{
                    filename: path.join("icons", "[name].[contenthash][ext]")
                }
            },{
                test: /\.(ts)x?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false,
                        },
                    }
                },
                exclude: /node_modules|\.d\.ts$/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    optimization: {
        minimizer: [
        new ImageMinimizerPlugin({
            minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
                plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo', { name: 'preset-default' }],
                ],
            },
            },
        }),
        ],
    },
}