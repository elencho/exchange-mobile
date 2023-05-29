module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : { 'react-native-flipper': { platforms: { ios: null } } }),
  },
};
