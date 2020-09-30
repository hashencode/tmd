const path = require("path");
const config = {
  projectName: "tmd",
  date: "2020-3-28",
  designWidth: 750,
  deviceRatio: {
    375: 1 / 2,
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  onePxTransform: true,
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  alias: {},
  defineConstants: {},
  copy: {
    patterns: [
      { from: "src/assets/", to: `dist/${process.env.TARO_ENV}/assets` },
    ],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["tmdesign"],
    postcss: {
      autoprefixer: {
        enable: true,
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
