import "../demoStyle.scss";

import React, { useState } from "react";
import { TmButton, TmCard, TmNavBar, TmSpace, TmSwitch } from "tmdesign";

import { View } from "@tarojs/components";

function DemoSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"开关"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmSpace>
          <TmSwitch tmSize={"lg"} />
          <TmSwitch />
          <TmSwitch tmSize={"sm"} />
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
      <TmCard
        tmRound
        className={"demo__card"}
        tmTitle={"完全控制"}
        tmAction={
          <TmButton onClick={handleSwitch} tmType={"primary"} tmSize={"sm"}>
            切换
          </TmButton>
        }
      >
        <TmSpace>
          <TmSwitch tmChecked={isChecked} />
        </TmSpace>
      </TmCard>
    </View>
  );
}

export default DemoSwitch;
