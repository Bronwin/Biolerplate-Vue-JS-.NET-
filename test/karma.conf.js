var webpackConfig = require('../webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    files: ['./specs/*.js'],
    preprocessors: {
      './specs/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
