module.exports = function (api) {
  api.cache(true);
  return {
    // Expo SDK 57 : babel-preset-expo branche seul le plugin Reanimated/Worklets, sans ajout manuel.
    presets: ['babel-preset-expo'],
  };
};
