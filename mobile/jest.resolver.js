const rnResolver = require('@react-native/jest-preset/jest/resolver');

/** Delegates to the React Native resolver; shared ESM sources load as CJS in jest-expo. */
module.exports = (request, options) => rnResolver(request, options);

module.exports.unstable_shouldLoadAsEsm = () => false;
