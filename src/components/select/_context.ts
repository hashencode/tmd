import React from "react";

const SelectContext = React.createContext<{
  isReachMax?: boolean; // 达到最大可选取数量
  tempSelectedValues: (number | string)[]; // 当前选中项
  updateSelectValues: (args: any) => void; // 选中事件回调
  optionInit: (args: any) => void; // 初始化
}>({
  isReachMax: false,
  tempSelectedValues: [],
  updateSelectValues: () => {},
  optionInit: () => {},
});

export default SelectContext;
