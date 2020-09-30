import "../demoStyle.scss";

import {
  TmCard,
  TmDescription,
  TmDescriptionItem,
  TmNavBar,
} from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoDescription() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"描述"} />
      <TmCard tmRound className={"demo__card"}>
        <TmDescription>
          <TmDescriptionItem tmTitle={"姓名"}>王虎虎</TmDescriptionItem>
          <TmDescriptionItem tmTitle={"地址"}>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </TmDescriptionItem>
        </TmDescription>
      </TmCard>
    </View>
  );
}

export default DemoDescription;
