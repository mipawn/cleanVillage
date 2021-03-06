module.exports = {
  publicPath: process.env.VUE_APP_SRC,
  assetsDir: 'assets',
  outputDir: 'street',
  devServer: {
    host: '0.0.0.0',
    public: '168.100.188.47:80',
    port: 80,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
}
