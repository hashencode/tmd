import "../demoStyle.scss";

import { TmCard, TmInput, TmNavBar, TmSearch } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoSearch() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"搜索框"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"圆角"}>
        <TmSearch tmRound>
          <TmInput tmPlaceholder={"AD钙奶买一送一"} />
        </TmSearch>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"边框"}>
        <TmSearch tmBorder>
          <TmInput tmPlaceholder={"AD钙奶买一送一"} />
        </TmSearch>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"阴影"}>
        <TmSearch tmShadow>
          <TmInput tmPlaceholder={"AD钙奶买一送一"} />
        </TmSearch>
      </TmCard>
    </View>
  );
}

export default DemoSearch;
