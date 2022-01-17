const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode,
  target,
  // entry: "./src/index.js",
  entry: {
    main: "./src/index.js",
    remote: "./publicPath",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "http://localhost:3012/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      // JavaScript
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      // library: { type: "var", name: "app2" },
      exposes: {
        "./CommonComponent": "./src/Components/CommonComponent",
      },
      shared: {
        // ...deps,
        react: {
          singleton: true,
          eager: true,
          // requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-redux": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-redux"],
        },
        "@reduxjs/toolkit": {
          singleton: true,
          eager: true,
          requiredVersion: deps["@reduxjs/toolkit"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],

  devtool: "source-map",
  devServer: {
    port: 3012,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,

    // proxy: {
    //   '/api': 'http://localhost:3000',
    // pathRewrite: { '^/api': '' },
    // },

    // historyApiFallback: true,
    // watchContentBase: true // reload full page
  },

  resolve: {
    // alias: {
    //   Utilities: path.resolve(__dirname, 'src/utilities/'),
    //   Templates: path.resolve(__dirname, 'src/templates/'),
    // },
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
  },
};
