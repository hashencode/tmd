import "../demoStyle.scss";

import {TmCard, TmIcon, TmNavBar, TmSteps} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoSteps() {
  return (
    <View className={"demo "}>
      <TmNavBar tmTitle={"步骤条"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"横向"}>
        <TmSteps
          tmData={[
            {
              text: "步骤1",
              percent: 0,
            },
            {
              text: "步骤2",
              percent: 50,
            },
            {
              text: "步骤3",
              percent: 100,
            },
          ]}
          tmValue={50}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"纵向"}>
        <TmSteps
          tmData={[
            {
              text: "步骤1",
              percent: 0,
            },
            {
              text: "步骤2",
              percent: 50,
              height: 100,
            },
            {
              text: "步骤3",
              percent: 100,
            },
          ]}
          tmVertical
          tmValue={70}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义图标"}>
        <TmSteps
          tmData={[
            {
              activeIcon: (
                <TmIcon tmValue={"dingwei"} tmColor={"#1890ff"} tmSize={40}/>
              ),
              text: "步骤1",
              percent: 0,
              iconSpace: 10,
            },
            {
              activeIcon: (
                <TmIcon tmValue={"chenggong"} tmColor={"#1890ff"} tmSize={40}/>
              ),
              text: "步骤2",
              percent: 50,
              iconSpace: 10,
            },
            {
              icon: <TmIcon tmValue={"dagou"}/>,
              text: "步骤3",
              percent: 100,
            },
          ]}
          tmVertical
          tmValue={70}
        />
      </TmCard>
    </View>
  );
}

export default DemoSteps;
