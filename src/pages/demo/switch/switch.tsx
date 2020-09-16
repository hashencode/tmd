import "../demoStyle.scss";

import React, { useState } from "react";
import {
  TmButton,
  TmCard,
  TmNavBar,
  TmSpace,
  TmSwitch,
} from "../../../components";

import { View } from "@tarojs/components";

function DemoSwitch() {
  const [switchStatus, setSwitchStatus] = useState(false);
  const handleSwitch = () => {
    setSwitchStatus(!switchStatus);
  };

  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"开关"} />
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"尺寸"}
        tmAction={
          <TmButton onClick={handleSwitch} tmType={"primary"} tmSize={"sm"}>
            切换
          </TmButton>
        }
      >
        <TmSpace>
          <TmSwitch tmSize={"lg"} tmChecked={switchStatus} />
          <TmSwitch tmChecked={switchStatus} />
          <TmSwitch tmSize={"sm"} tmChecked={switchStatus} />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"加载状态"}>
        <TmSpace>
          <TmSwitch tmLoading />
          <TmSwitch tmLoading tmDefaultChecked />
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"禁用"}>
        <TmSpace>
          <TmSwitch tmDisabled />
          <TmSwitch tmDefaultChecked={true} tmDisabled />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoSwitch;
