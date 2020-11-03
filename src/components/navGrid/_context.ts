import React from "react";

const NavGridContext = React.createContext<{
  tmHorizon?: boolean;
  tmSpace?: number | string;
  tmTextSpace?: number | string;
}>({
  tmHorizon: false,
  tmSpace: 0,
  tmTextSpace: 0,
});

export default NavGridContext;
