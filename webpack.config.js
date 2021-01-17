const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
    return {
        mode: 'development',

        entry: path.resolve(__dirname, './src', 'index.ts'),
        output: {
            filename: 'bundle[hash].js',
            path: path.resolve(__dirname, './dist'),
        },

        devtool: 'inline-source-map',

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },

        plugins: [
            new htmlWebpackPlugin({
                template: path.join(__dirname, './', 'index.html'),
            })
        ],

        resolve: {
            extensions: ['.ts', '.js']
        },

        watchOptions: {
            ignored: '/node_modules/'
        }
    }
}