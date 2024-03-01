// webpack.config.js

const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        auth: './src/main/resources/static/AuthBundle.js',
        user: './src/main/resources/static/UserBundle.js',
        profile:'./src/main/resources/static/ProfileBundle.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'src/main/resources/static/bundles'),
    },

};
