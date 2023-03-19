const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",

    // output: {
    //     filename: "bundle.js",
    //     path: path.resolve(__dirname, "dist"),
    // },

    output: {
        path: path.resolve(__dirname, "dist"),

        // FOR STATIC NAME WHEN USING SINGLE ENTRY POINT
        // filename: "bundle.js",

        // FOR DYNAMIC NAME WHEN USING MULTIPLE ENTRY POINT
        // filename: "[name].js", // IT WILL PICK NAME AS bundle.js BECAUSE WE GAVE KEY bundle IN entry

        filename: "[name][contenthash].js", // IN ORDER TO AVOID CACHE PROBLEM WE ARE USING DIFFERENT HASH EACH TIME

        assetModuleFilename: "[name][ext]", // TO KEEP THE ORIGINAL FILENAME AS IT WAS

        clean: true, // CLEAR OUTPUT FOLDER THEN ADD NEW OUTPUT FILES
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },

            {
                test: /\.(png|jpeg|jpg|svg|webp)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 3000,
        open: true,
    },
};
