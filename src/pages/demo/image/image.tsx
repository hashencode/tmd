import "../demoStyle.scss";

import {TmCard, TmImage, TmNavBar} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoImage() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"图片"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"设置高度"}>
        <TmImage
          tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          style={{width: "100px"}}
          tmHeight={"50px"}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"宽高比"}>
        <TmImage
          tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          style={{width: "100px"}}
          tmRatio={0.6}
        />
      </TmCard>
    </View>
  );
}

export default DemoImage;
