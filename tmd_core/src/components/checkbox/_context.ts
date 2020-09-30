import React from "react";

const CheckboxContext = React.createContext<{
  isRadio?: boolean; // 单选模式
  isReachMax?: boolean; // 达到最大可选取数量
  tmSize: "sm" | "mid" | "lg"; // 尺寸
  activeKeys: (number | string)[]; // 当前选中项
  updateActiveKeys: (args: any) => void; // 选中事件回调
  optionInit: (args: any) => void; // 初始化
}>({
  isRadio: false,
  isReachMax: false,
  tmSize: "mid",
  activeKeys: [],
  updateActiveKeys: () => {},
  optionInit: () => {},
});

export default CheckboxContext;
