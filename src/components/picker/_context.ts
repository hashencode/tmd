import React from "react";

const PickerContext = React.createContext<{
  isPeak?: boolean; // 达到最大可选取数量
  activeKeys: (number | string)[]; // 当前选中项
  updateActiveKeys: (args: any) => void; // 选中事件回调
  optionInit: (args: any) => void; // 初始化
}>({
  isPeak: false,
  activeKeys: [],
  updateActiveKeys: () => {},
  optionInit: () => {},
});

export default PickerContext;
