import "../demoStyle.scss";

import { TmButton, TmCard, TmNavBar, TmSpace } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoSpace() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"间距"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"横向"}>
        <TmSpace>
          <TmButton tmType={"primary"}>1</TmButton>
          <TmButton tmType={"primary"}>2</TmButton>
          <TmButton tmType={"primary"}>3</TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"竖向"}>
        <TmSpace tmVertical>
          <TmButton tmType={"primary"}>1</TmButton>
          <TmButton tmType={"primary"}>2</TmButton>
          <TmButton tmType={"primary"}>3</TmButton>
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoSpace;
