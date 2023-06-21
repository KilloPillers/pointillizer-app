module.exports = function override(config, env) {
  config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    })

  // Resolve the rbush module for the web worker
  config.module.rules.push({
    test: /rbush\.js$/,
    use: 'worker-loader',
  });

  // Include the rbush module in the main bundle (optional)
  config.module.rules.push({
    test: /rbush\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  });

  return config;
}