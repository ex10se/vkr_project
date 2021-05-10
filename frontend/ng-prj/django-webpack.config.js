const BundleTracker = require('webpack-bundle-tracker');
module.exports = {
  plugins: [new BundleTracker({
    path: "../../backend/prj/assets/",
    filename: "webpack-stats-angular.json"
  })],
  output: {
    path: require('path').resolve('../../backend/prj/assets/angular'),
    filename: "[name]-[hash].js"
  }
};
