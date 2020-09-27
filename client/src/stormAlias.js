const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@stores': path.resolve(__dirname, './src/stores'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/pages/layouts'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
};
