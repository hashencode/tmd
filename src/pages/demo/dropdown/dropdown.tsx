import "../demoStyle.scss";

import { TmDropdown, TmDropDownOption, TmNavBar } from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoDropdown() {
  return (
    <View className={"demo"} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <TmNavBar tmTitle={"下拉菜单"} />
      <TmDropdown tmMaskClosable tmFooter={<View>123</View>}>
        {Array(20)
          .fill("")
          .map((_item, index) => {
            return (
              <TmDropDownOption
                key={index}
                tmValue={index}
                tmText={`选项_${index}`}
              >
                选项_{index}
              </TmDropDownOption>
            );
          })}
      </TmDropdown>
    </View>
  );
}

export default DemoDropdown;
