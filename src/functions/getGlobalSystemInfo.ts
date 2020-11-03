import {
  getEnv,
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from "@tarojs/taro";

// 获取小程序胶囊位置信息，来源：https://github.com/lingxiaoyi/Taro-navigation-bar
function getGlobalSystemInfo() {
  // 最后返回的对象
  const globalSystemInfo = {};
  // 通过Taro内置方法获取系统信息
  const systemInfo = getSystemInfoSync();
  // 判断是否为ios
  const ios = !!((systemInfo.system || "").toLowerCase().search("ios") + 1);
  let rect;
  let {
    platform,
    screenHeight,
    windowHeight,
    windowWidth,
    statusBarHeight = 0,
  } = systemInfo;

  // 尝试获取胶囊信息
  try {
    rect = getMenuButtonBoundingClientRect() || null;
    // 取值为0的情况，有可能width不为0 top为0的情况
    if (!rect || !rect.width || !rect.top || !rect.left || !rect.height) {
      throw "getMenuButtonBoundingClientRect error";
    }
    const { right } = rect;
    const { windowWidth } = systemInfo;
    // 计算出到胶囊右端到页面右端的距离
    rect.marginRight = windowWidth - right;
  } catch (error) {
    let gap: number; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度
    switch (platform) {
      case "android":
        gap = 8;
        width = 96;
        break;
      case "devtools":
        gap = ios ? 5.5 : 7.5;
        break;
      default:
        gap = 4;
        width = 88;
        break;
    }
    if (!statusBarHeight) {
      // 如果是 h5 直接给 5 像素的高度
      statusBarHeight =
        getEnv() === "WEB" ? 5 : screenHeight - windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: statusBarHeight + gap + 32,
      height: 32,
      left: windowWidth - width - 10,
      right: windowWidth - 10,
      top: statusBarHeight + gap,
      width,
      marginRight: 10,
    };
  }

  let navBarHeight = "";
  let navBarExtendHeight = 0;
  if (!statusBarHeight) {
    // 开启wifi和打电话下
    statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    navBarHeight = (function () {
      const gap = rect.top - statusBarHeight;
      return 2 * gap + rect.height;
    })();
    statusBarHeight = 0;
    navBarExtendHeight = 0; // 下方扩展4像素高度 防止下方边距太小
  } else {
    navBarHeight = (function () {
      const gap = rect.top - statusBarHeight;
      return statusBarHeight + 2 * gap + rect.height;
    })();
    if (ios) {
      navBarExtendHeight = 4; // 下方扩展4像素高度 防止下方边距太小
    } else {
      navBarExtendHeight = 0;
    }
  }

  globalSystemInfo["pageInfo"] = {
    platform,
    screenHeight,
    windowHeight,
    windowWidth,
    ios,
  };
  globalSystemInfo["navBarInfo"] = {
    navBarHeight,
    navBarExtendHeight,
    statusBarHeight,
  };
  globalSystemInfo["capsuleInfo"] = rect;

  return globalSystemInfo;
}

export default getGlobalSystemInfo;
