module.exports = {
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       'module:metro-react-native-babel-preset',
//       'module:react-native-dotenv',
//     ],
//   };
// };
