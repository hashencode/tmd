import "../demoStyle.scss";

import React, { useRef, useState } from "react";
import { TmButton, TmCard, TmNavBar, TmScroll, TmSpace } from "tmdesign";

import { View } from "@tarojs/components";

function DemoScroll() {
  const scrollRef = useRef<any>(null);

  const defaultText = `Authoritatively streamline error-free mindshare whereas exceptional
            paradigms. Rapidiously reconceptualize worldwide networks via
            wireless alignments. Interactively cultivate focused collaboration
            and idea-sharing via parallel total linkage. Continually evolve
            distributed infomediaries and integrated infrastructures.
            Continually facilitate 2.0 infomediaries vis-a-vis B2C human
            capital. Interactively target out-of-the-box niches and empowered
            users. Dynamically strategize unique ROI and value-added leadership
            skills. Continually transition cost effective benefits without
            backend channels. Conveniently provide access to cross functional
            manufactured products with revolutionary portals. Collaboratively
            facilitate user-centric methods of empowerment through
            functionalized niche markets. Seamlessly target orthogonal
            Authoritatively streamline error-free mindshare whereas exceptional
            paradigms. Rapidiously reconceptualize worldwide networks via
            wireless alignments. Interactively cultivate focused collaboration
            and idea-sharing via parallel total linkage. Continually evolve
            distributed infomediaries and integrated infrastructures.
            Continually facilitate 2.0 infomediaries vis-a-vis B2C human
            capital. Interactively target out-of-the-box niches and empowered
            users. Dynamically strategize unique ROI and value-added leadership
            skills. Continually transition cost effective benefits without
            backend channels. Conveniently provide access to cross functional
            manufactured products with revolutionary portals. Collaboratively
            facilitate user-centric methods of empowerment through
            functionalized niche markets. Seamlessly target orthogonal`;

  const [text, setText] = useState(defaultText);

  // const [refresher, setRefresher] = useState("pending");

  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"滚动增强"} />
      <TmCard
        className={"demo__card"}
        tmTitle={"基础"}
        tmAction={
          <TmSpace>
            <TmButton
              onClick={() => {
                scrollRef.current.startRefreshing();
              }}
              tmType={"primary"}
            >
              手动刷新
            </TmButton>
            <TmButton
              onClick={() => {
                scrollRef.current.stopRefreshing();
              }}
              tmType={"primary"}
            >
              终止刷新
            </TmButton>
          </TmSpace>
        }
      >
        <TmScroll
          ref={scrollRef}
          style={{
            height: "50vh",
          }}
          tmRefresher={<View>刷新</View>}
          onRefresh={(event) => {
            console.log(event);
          }}
          tmLowerThreshold={300}
          onScrollToLower={() => {
            setText(text + text);
          }}
        >
          <View>{text}</View>
        </TmScroll>
      </TmCard>
    </View>
  );
}

export default DemoScroll;
