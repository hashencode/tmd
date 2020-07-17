import React from "react";

const PickerContext = React.createContext<{
  activeKeys: (number | string)[];
  updateActiveKeys: (args: any) => void;
  optionInit: (args: any) => void;
}>({
  activeKeys: [],
  updateActiveKeys: () => {
  },
  optionInit: () => {
  },
});

export default PickerContext;
