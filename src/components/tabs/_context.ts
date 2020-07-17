import React from "react";

const TabsContext = React.createContext<{
  activeKey: string;
  keyCache: string[];
  tmLazyLoad: boolean;
}>({
  activeKey: "",
  keyCache: [],
  tmLazyLoad: true,
});

export default TabsContext;
