export default {
  pages: [
    "pages/index/index",
    "pages/demo/avatar/avatar",
    "pages/demo/badge/badge",
    "pages/demo/button/button",
    "pages/demo/card/card",
    "pages/demo/collapse/collapse",
    "pages/demo/coupon/coupon",
    "pages/demo/divider/divider",
    "pages/demo/drawer/drawer",
    "pages/demo/flex/flex",
    "pages/demo/icon/icon",
    "pages/demo/image/image",
    "pages/demo/list/list",
    "pages/demo/loading/loading",
    "pages/demo/message/message",
    "pages/demo/modal/modal",
    "pages/demo/navBar/navBar",
    "pages/demo/navGrid/navGrid",
    "pages/demo/notice/notice",
    "pages/demo/popup/popup",
    "pages/demo/progress/progress",
    "pages/demo/result/result",
    "pages/demo/space/space",
    "pages/demo/statistic/statistic",
    "pages/demo/steps/steps",
    "pages/demo/switch/switch",
    "pages/demo/tag/tag",
    "pages/me/me",
    "pages/demo/transition/transition",
    "pages/demo/calendar/calendar",
    "pages/demo/bill/bill",
    "pages/demo/waterMark/waterMark",
    "pages/demo/skeleton/skeleton",
    "pages/demo/tabs/tabs",
    "pages/demo/description/description",
    "pages/demo/dropdown/dropdown",
    "pages/demo/picker/picker",
    "pages/demo/scroll/scroll",
    "pages/demo/input/input",
    "pages/demo/inputNumber/inputNumber"
  ],
  window: {
    navigationStyle: "custom",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    selectedColor: "#1890ff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "Home",
        iconPath: "/assets/image/tabbar-icon/shouye.png",
        selectedIconPath: "/assets/image/tabbar-icon/shouye-active.png"
      },
      {
        pagePath: "pages/me/me",
        text: "Me",
        iconPath: "/assets/image/tabbar-icon/shouye.png",
        selectedIconPath: "/assets/image/tabbar-icon/shouye-active.png"
      }
    ]
  }
};
