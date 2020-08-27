import React from "react";

const DescriptionContext = React.createContext<{
  tmTitleStyle?: object;
  tmDescStyle?: object;
}>({
  tmTitleStyle: { width: "20%" },
  tmDescStyle: {}
});

export default DescriptionContext;
