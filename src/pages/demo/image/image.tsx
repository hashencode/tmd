import "../demoStyle.scss";

import { TmCard, TmImage, TmNavBar, TmSpace } from "../../../components";

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
      <TmCard tmRound className={"demo__card"} tmTitle={"设置宽高比"}>
        <TmSpace>
          <TmImage
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
            style={{ width: "100px" }}
            tmRatio={0.6}
          />
          <TmImage
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
            style={{ width: "100px" }}
            tmRatio={0.9}
          />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoImage;
