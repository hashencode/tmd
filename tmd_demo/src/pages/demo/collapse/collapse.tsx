import "../demoStyle.scss";

import {
  TmButton,
  TmCard,
  TmCollapse,
  TmCollapseItem,
  TmNavBar,
} from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoCollapse() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"折叠面板"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"默认"}>
        <TmCollapse>
          <TmCollapseItem tmTitle={"Part 1"} tmId={"12"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
          <TmCollapseItem tmTitle={"Part 2"} tmId={"13"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
        </TmCollapse>
      </TmCard>
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"圆角内外边框阴影无箭头"}
      >
        <TmCollapse tmOuterBorder tmInnerBorder tmRound tmHideArrow tmShadow>
          <TmCollapseItem tmTitle={"Part 1"} tmId={"12"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
          <TmCollapseItem tmTitle={"Part 2"} tmId={"13"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
        </TmCollapse>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"手风琴"}>
        <TmCollapse tmAccordion>
          <TmCollapseItem tmTitle={"Part 1"} tmId={"12"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
          <TmCollapseItem tmTitle={"Part 2"} tmId={"13"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
        </TmCollapse>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认展开"}>
        <TmCollapse tmDefaultKey={12}>
          <TmCollapseItem tmTitle={"Part 1"} tmId={"12"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
          <TmCollapseItem tmTitle={"Part 2"} tmId={"13"}>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"} />
          </TmCollapseItem>
        </TmCollapse>
      </TmCard>
    </View>
  );
}

export default DemoCollapse;
