import "../demoStyle.scss";

import {TmAvatar, TmCard, TmNavBar, TmSpace} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoAvatar() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"头像"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"大小"}>
        <TmSpace>
          <TmAvatar
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
          <TmAvatar
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
            tmSize={50}
          />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"外观"}>
        <TmSpace>
          <TmAvatar
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
          />
          <TmAvatar
            tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
            tmShape={"rect"}
          />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoAvatar;
