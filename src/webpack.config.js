// webpack.config.js
module.exports = {
    // Other webpack configurations...
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "path": require.resolve("path-browserify")
      }
    }
  };
  