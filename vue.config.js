module.exports = {
  publicPath: "./",
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    }
  }
};
