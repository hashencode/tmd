import React from "react";
import navBarStore from "./navBarStore";
import systemStore from "./systemStore";

export const storesContext = React.createContext({
  navBarStore: new navBarStore(),
  systemStore: new systemStore(),
});
