import React from "react";

const CollapseContext = React.createContext<{
  tmInnerBorder?: boolean;
  activeKey: number | string;
  onIndexChange: (args: number | string) => void;
  isAccordion?: boolean;
  tmHideArrow?: boolean;
}>({
  tmInnerBorder: false,
  activeKey: -1,
  isAccordion: false,
  tmHideArrow: false,
  // @ts-ignore
  onIndexChange: (key) => {},
});

export default CollapseContext;
