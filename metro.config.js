const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  '@assets': __dirname + '/assets',
};

module.exports = defaultConfig;
