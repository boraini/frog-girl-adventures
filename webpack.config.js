const path = require('path');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  context: path.resolve(__dirname, "./src"),
  entry: {
    menu: "./menu.js",
    level: "./level.js"
	},
  output: {
    path: path.resolve(__dirname, "js"), // string
    filename: "[name].js", // string
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
      },
      /*{ oneOf: [ / rules / ] },
      // only use one of these nested rules
      { rules: [ / rules / ] },
      // use all of these nested rules (combine with conditions to be useful)
      { resource: { and: [ / conditions / ] } },
      // matches only if all conditions are matched
      { resource: { or: [ / conditions / ] } },
      { resource: [ / conditions / ] },
      // matches if any condition is matched (default for arrays)
      { resource: { not: / condition / } }
      // matches if the condition is not matched*/
    ],
    /* Advanced module configuration (click to show) */
  },
  /*resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules
    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used
    alias: {
      // a list of module name aliases
      "module": "new-module",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      // modules aliases are imported relative to the current context
    },
  },*/
  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed. // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  //externals: ["react", /^@angular/],
  // Don't follow/bundle these modules, but request them at runtime from the environment
  /*serve: { //object
    port: 1337,
    content: './dist',
    // ...
  },*/
  // lets you provide options for webpack-serve
  stats: "errors-only",
  // lets you precisely control what bundle information gets displayed
  /*devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },*/
}
