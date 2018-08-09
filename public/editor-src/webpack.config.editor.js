const path = require("path");
const webpack = require("webpack");

const getExtensions = target => {
  const defaultExtensions = [".js", ".jsx", ".json"];

  switch (target) {
    case "WP":
      return [".wp.js", ".wp.jsx", ...defaultExtensions];
    default:
      return defaultExtensions;
  }
};

module.exports = options => {
  return {
    mode: options.IS_PRODUCTION ? "production" : "development",
    entry: {
      editor: [
        "./editor/js/bootstraps/initBrizyGlobal.js",
        "./editor/js/bootstraps/editor/configInit.js",
        "./editor/js/bootstraps/editor/index.js"
      ]
    },
    output: {
      path: path.resolve(options.BUILD_PATH, `editor/js`),
      filename: "[name].js"
    },
    resolve: {
      alias: {
        visual: path.resolve(__dirname, "editor/js"),
        "visual-template": options.TEMPLATE_PATH
      },
      extensions: getExtensions(options.TARGET)
    },
    externals: {
      jquery: "jQuery"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.resolve(__dirname, "editor")],
          loader: "babel-loader"
        },
        {
          test: /Preview\.jpg$/,
          include: [path.resolve(__dirname, "templates")],
          loader: "null-loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          options.IS_PRODUCTION ? "production" : "development"
        ),
        TARGET: JSON.stringify(options.TARGET),
        IS_EDITOR: true,
        IS_PREVIEW: false
      })
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: "editor.vendor.bundle"
          }
        }
      }
    },
    devtool: options.IS_PRODUCTION ? false : "cheap-module-eval-source-map",
    watch: !options.IS_PRODUCTION,
    watchOptions: {
      ignored: new RegExp(`templates/${options.TEMPLATE_NAME}`)
    }
  };
};
