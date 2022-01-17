const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode,
  target,
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "http://localhost:3011/",
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ModuleFederationPlugin({
      name: "app1",
      // options' typings in typescript
      // runtime: string | false,
      remotes: { app2: "app2@//localhost:3012/remoteEntry.js" },
      shared: {
        // ...deps,
        react: {
          singleton: true,
          eager: true,
          // requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
        },
        "react-redux": {
          singleton: true,
        },
        "@reduxjs/toolkit": {
          singleton: true,
        },
      },

      // shared: {
      //   react: {
      //     import: 'react', // the "react" package will be used a provided and fallback module
      //     shareKey: 'react', // under this name the shared module will be placed in the share scope
      //     shareScope: 'default', // share scope with this name will be used
      //     singleton: true, // only a single version of the shared module is allowed
      //   },
      //   'react-dom': {
      //     singleton: true, // only a single version of the shared module is allowed
      //   },
      // }
    }),
  ],

  devtool: "source-map",
  devServer: {
    port: 3011,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
    hot: false,
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
