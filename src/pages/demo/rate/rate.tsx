import "../demoStyle.scss";

import { TmCard, TmNavBar, TmRate, TmSpace } from "../../../components";

import React from "react";
import { View } from "@tarojs/components";
import { colorDanger } from "../../../components/_style/theme";

function DemoGrid() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"评分"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmSpace tmVertical>
          <TmRate />
          <TmRate tmShape={"face"} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义图标"}>
        <TmRate tmIcon={"like"} tmActiveIcon={"like_fill"} />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义颜色"}>
        <TmRate tmColor={colorDanger} />
      </TmCard>
    </View>
  );
}

export default DemoGrid;
