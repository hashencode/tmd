import "../demoStyle.scss";

import {TmAvatar, TmCard, TmNavBar, TmSpace} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoAvatar() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"头像"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace>
          <TmAvatar
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
          />
          <TmAvatar
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
            tmSize={50}
          />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmSpace>
          <TmAvatar
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
          />
          <TmAvatar
            tmSrc={
              " https://tva3.sinaimg.cn/large/007VJd8cly1ghmmxa9u9uj3069069q2t.jpg"
            }
            tmShape={"rect"}
          />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoAvatar;
