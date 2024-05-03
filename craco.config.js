/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@compositions': path.resolve(__dirname, 'src/compositions'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@api-client': path.resolve(__dirname, 'src/api-client'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@legacy': path.resolve(__dirname, 'src/legacy'),
      '@api': path.resolve(__dirname, 'src/api/gen/ts/'),
      '@front-end/core': path.resolve(__dirname, 'src/legacy/core'),
      '@front-end/hooks': path.resolve(__dirname, 'src/legacy/hooks'),
      '@front-end/common-ui': path.resolve(__dirname, 'src/legacy/common-ui'),
    },
  },
};
