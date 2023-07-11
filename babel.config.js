module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
        },
      ],
      ['inline-dotenv'],
      'react-native-reanimated/plugin',
    ],
  };
};
