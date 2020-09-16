import React from "react";

const TabsContext = React.createContext<{
  activeIndex: string;
  indexCache: string[];
  tmLazyLoad: boolean;
}>({
  activeIndex: "-1",
  indexCache: ["-1"],
  tmLazyLoad: true,
});

export default TabsContext;
