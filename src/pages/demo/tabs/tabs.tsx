import "../demoStyle.scss";
import "./tabs.scss";

import {TmCard, TmNavBar, TmTabs, TmTabsItem} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoGrid() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"标签页"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"水平显示"}>
        <TmTabs>
          <TmTabsItem tmKey={"1"} tmTitle={"页面1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmKey={"2"} tmTitle={"页面2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmKey={"3"} tmTitle={"页面3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"垂直显示"}>
        <TmTabs tmVertical>
          <TmTabsItem tmKey={"1"} tmTitle={"页面1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmKey={"2"} tmTitle={"页面2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmKey={"3"} tmTitle={"页面3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"无下划线"}>
        <TmTabs tmHideUnderline>
          <TmTabsItem tmKey={"1"} tmTitle={"页面1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmKey={"2"} tmTitle={"页面2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmKey={"3"} tmTitle={"页面3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认激活"}>
        <TmTabs tmDefaultKey={"2"}>
          <TmTabsItem tmKey={"1"} tmTitle={"页面1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmKey={"2"} tmTitle={"页面2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmKey={"3"} tmTitle={"页面3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义样式"}>
        <TmTabs
          tmDefaultKey={"2"}
          tmActiveClassname="tabs-active"
          tmHideUnderline
        >
          <TmTabsItem tmKey={"1"} tmTitle={"页面1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmKey={"2"} tmTitle={"页面2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmKey={"3"} tmTitle={"页面3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
    </View>
  );
}

export default DemoGrid;
