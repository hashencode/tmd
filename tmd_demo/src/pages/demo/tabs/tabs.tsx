import "../demoStyle.scss";
import "./tabs.scss";

import { TmCard, TmNavBar, TmTabs, TmTabsItem } from "tmdesign";

import React from "react";
import { ScrollView, View } from "@tarojs/components";

function DemoTabs() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"标签页"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"水平显示"}>
        <TmTabs>
          <TmTabsItem tmTitle={"页面1"} tmId={"1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面2"} tmId={"2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面3"} tmId={"3"}>
            内容 3
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面4"} tmId={"4"}>
            内容 4
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面5"} tmId={"5"}>
            内容 5
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面6"} tmId={"6"}>
            内容 6
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"垂直显示"}>
        <TmTabs tmVertical>
          <TmTabsItem tmTitle={"页面1"} tmId={"0"}>
            <ScrollView scrollY style={{ height: "300px" }}>
              <View>
                Authoritatively streamline error-free mindshare whereas
                exceptional paradigms. Rapidiously reconceptualize worldwide
                networks via wireless alignments. Interactively cultivate
                focused collaboration and idea-sharing via parallel total
                linkage. Continually evolve distributed infomediaries and
                integrated infrastructures. Continually facilitate 2.0
                infomediaries vis-a-vis B2C human capital. Interactively target
                out-of-the-box niches and empowered users. Dynamically
                strategize unique ROI and value-added leadership skills.
                Continually transition cost effective benefits without backend
                channels. Conveniently provide access to cross functional
                manufactured products with revolutionary portals.
                Collaboratively facilitate user-centric methods of empowerment
                through functionalized niche markets. Seamlessly target
                orthogonal Authoritatively streamline error-free mindshare
                whereas exceptional paradigms. Rapidiously reconceptualize
                worldwide networks via wireless alignments. Interactively
                cultivate focused collaboration and idea-sharing via parallel
                total linkage. Continually evolve distributed infomediaries and
                integrated infrastructures. Continually facilitate 2.0
                infomediaries vis-a-vis B2C human capital. Interactively target
                out-of-the-box niches and empowered users. Dynamically
                strategize unique ROI and value-added leadership skills.
                Continually transition cost effective benefits without backend
                channels. Conveniently provide access to cross functional
                manufactured products with revolutionary portals.
                Collaboratively facilitate user-centric methods of empowerment
                through functionalized niche markets. Seamlessly target
                orthogonal
              </View>
            </ScrollView>
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面2"} tmId={"1"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面3"} tmId={"2"}>
            内容 3
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面4"} tmId={"3"}>
            内容 4
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面5"} tmId={"4"}>
            内容 5
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面6"} tmId={"5"}>
            内容 6
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"默认激活"}>
        <TmTabs tmDefaultKey={"2"}>
          <TmTabsItem tmTitle={"页面1"} tmId={"1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面2"} tmId={"2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面3"} tmId={"3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义样式"}>
        <TmTabs tmHeadItemActiveClassName="tabs-active" tmHideUnderline>
          <TmTabsItem tmTitle={"页面1"} tmId={"1"}>
            内容 1
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面2"} tmId={"2"}>
            内容 2
          </TmTabsItem>
          <TmTabsItem tmTitle={"页面3"} tmId={"3"}>
            内容 3
          </TmTabsItem>
        </TmTabs>
      </TmCard>
    </View>
  );
}

export default DemoTabs;
