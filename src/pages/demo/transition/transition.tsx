import "../demoStyle.scss";

import React, {useState} from "react";
import {TmButton, TmCard, TmDivider, TmNavBar, TmSpace, TmTransition,} from "../../../components";

import {View} from "@tarojs/components";

function DemoTransition() {
  const [isShow, setIsShow] = useState(false);
  const [motion, setMotion] = useState<any>("fade");

  const handleClick = (motion) => {
    setMotion(motion);
    setIsShow(!isShow);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"动画"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"动画效果"}>
        <TmSpace>
          <TmButton
            onClick={() => {
              handleClick("fade");
            }}
          >
            渐变
          </TmButton>

          <TmButton
            onClick={() => {
              handleClick("slide-left");
            }}
          >
            滑动
          </TmButton>
          <TmButton
            onClick={() => {
              handleClick("fade-left");
            }}
          >
            渐变+滑动
          </TmButton>
        </TmSpace>
        <TmDivider/>
        <TmSpace>
          <TmButton
            onClick={() => {
              handleClick("bounce");
            }}
          >
            弹跳
          </TmButton>
          <TmButton
            onClick={() => {
              handleClick("zoom");
            }}
          >
            缩放
          </TmButton>
          <TmButton
            onClick={() => {
              handleClick("punch");
            }}
          >
            冲击
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"}>
        <TmTransition tmShow={isShow} tmMotion={motion}>
          <TmButton tmType={"primary"}>{motion}</TmButton>
        </TmTransition>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"延迟"}>
        <TmTransition tmShow={isShow} tmMotion={motion} tmDelay={1000}>
          <TmButton tmType={"primary"}>{motion}</TmButton>
        </TmTransition>
      </TmCard>
    </View>
  );
}

export default DemoTransition;
