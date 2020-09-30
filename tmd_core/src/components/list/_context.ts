import React from "react";

const ListContext = React.createContext<{
  tmIndent?: boolean;
  tmInnerBorder?: boolean;
}>({
  tmIndent: false,
  tmInnerBorder: false,
});

export default ListContext;
