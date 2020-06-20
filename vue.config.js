module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [
      {
        progressiveImages: true,
        sharp: true,
      },
    ]);
  },
};
