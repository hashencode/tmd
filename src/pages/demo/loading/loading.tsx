import "../demoStyle.scss";

import { TmCard, TmLoading, TmNavBar } from "../../../components";

import React from "react";
import { View } from "@tarojs/components";

function DemoLoading() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"加载中"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"文字"}>
        <View>
          <TmLoading tmShow tmText={"加载中，请稍后"} />
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <View>
          <TmLoading tmShow tmText={"加载中，请稍后"} tmShape={"circle"} />
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"方向"}>
        <View>
          <TmLoading tmShow tmText={"加载中，请稍后"} tmVertical />
        </View>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"作为遮罩"}>
        <View>
          <TmLoading tmShow tmText={"加载中，请稍后"} tmVertical tmDelay={1000}>
            Authoritatively streamline error-free mindshare whereas exceptional
            paradigms. Rapidiously reconceptualize worldwide networks via
            wireless alignments. Interactively cultivate focused collaboration
            and idea-sharing via parallel total linkage. Continually evolve
            distributed infomediaries and integrated infrastructures.
          </TmLoading>
        </View>
      </TmCard>
    </View>
    // <View>
    //   <TmNavBar tmTitle={"Loading"} />
    //   <View>tmText</View>
    //   <View>
    //     <TmLoading tmShow tmText={"loading"} />
    //   </View>
    //   <View>tmIcon</View>
    //   <View>
    //     <TmLoading
    //       tmShow
    //       tmText={"loading"}
    //       tmIcon={<TmIcon tmValue={"send"} />}
    //     />
    //   </View>
    //   <View>tmVertical</View>
    //   <View>
    //     <TmLoading tmShow tmText={"vertical"} tmVertical />
    //   </View>
    //   <View>tmIconStyle</View>
    //   <View>
    //     <TmLoading
    //       tmShow
    //       tmText={"自定义样式"}
    //       tmVertical
    //       tmShape={"circle"}
    //       tmIconStyle={{ width: "50px", height: "50px" }}
    //     />
    //   </View>
    //   <View>作为遮罩</View>
    //   <View>
    //     <TmLoading tmShow tmDelay={1000}>
    //       <View
    //         style={{
    //           height: "100px",
    //           width: "100vw",
    //         }}
    //       />
    //     </TmLoading>
    //   </View>
    // </View>
  );
}

export default DemoLoading;
