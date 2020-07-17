import "../demoStyle.scss";

import {TmCard, TmNavBar, TmWaterMark} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoGrid() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"水印"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认"}>
        <TmWaterMark tmText={"水印文字"}>
          Authoritatively streamline error-free mindshare whereas exceptional
          paradigms. Rapidiously reconceptualize worldwide networks via wireless
          alignments. Interactively cultivate focused collaboration and
          idea-sharing via parallel total linkage. Continually evolve
          distributed infomediaries and integrated infrastructures.
        </TmWaterMark>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"透明度"}>
        <TmWaterMark tmText={"水印文字"} tmOpacity={0.5}>
          <View style={{width: "2px", height: "100px"}}/>
        </TmWaterMark>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"水印间距"}>
        <TmWaterMark tmText={"水印文字"} tmSpace={50}>
          <View style={{width: "2px", height: "100px"}}/>
        </TmWaterMark>
      </TmCard>
    </View>
  );
}

export default DemoGrid;
