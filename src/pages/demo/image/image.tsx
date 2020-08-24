import "../demoStyle.scss";

import { TmCard, TmImage, TmNavBar } from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoImage() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"图片"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"设置高度"}>
        <TmImage
          tmSrc={
            " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
          }
          style={{ width: "100px" }}
          tmHeight={"50px"}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"宽高比"}>
        <TmImage
          tmSrc={
            " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
          }
          style={{ width: "100px" }}
          tmRatio={0.6}
        />
      </TmCard>
    </View>
  );
}

export default DemoImage;
