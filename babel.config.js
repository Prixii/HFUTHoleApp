module.exports = function (api) {
  api.cache(true)

  const plugins = [
    ['nativewind/babel'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ]

  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', ...plugins],
      },
    },
    plugins,
  }
}
