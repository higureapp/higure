const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.transformer = {
    ...config.transformer,
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
        compress: {
            drop_console: false, // true in production
        },
    },
};

config.cacheStores = [
    {
        name: 'filesystem',
        rootPath: '.metro-cache',
    },
];

module.exports = withNativeWind(config, { input: './global.css' })