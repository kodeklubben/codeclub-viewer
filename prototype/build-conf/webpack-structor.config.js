var webpack = require("webpack");

module.exports = {
        devtool: 'inline-source-map',
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        presets: ['react-hmre'],
                        plugins: [
                            'babel-plugin-add-module-exports'
                        ]
                    }
                },
                {test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader"},
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/,
                    exclude: /node_modules/,
                    loader: 'url-loader'
                }
            ]
        },
        resolve: {
            extensions: [
                '',
                '.js',
                '.jsx',
                '.react.js'
            ]
        },
        externals: {
            "jquery": "jQuery"
        }
};

