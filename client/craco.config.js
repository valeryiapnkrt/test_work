const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', {legacy: true}],
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        aliases: {
          '@stores': './src/stores',
          '@pages': './src/pages',
          '@layouts': './src/pages/layouts',
          '@routes': './src/routes',
          '@components': './src/components',
          '@config': './src/config',
          '@helpers': './src/helpers',
          '@api': './src/api',
          '@utils': './src/utils'
        },
      },
    },
  ],
};
