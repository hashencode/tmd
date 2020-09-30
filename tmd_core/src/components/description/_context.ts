import React from "react";

const DescriptionContext = React.createContext<{
  tmSpace?: "xs" | "sm" | "mid" | "lg" | number; // 间距大小
  tmTitleStyle?: object;
  tmDescStyle?: object;
}>({
  tmSpace: "sm", // 间距大小
  tmTitleStyle: { width: "20%" },
  tmDescStyle: {},
});

export default DescriptionContext;
