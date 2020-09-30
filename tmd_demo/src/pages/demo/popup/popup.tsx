import "../demoStyle.scss";

import React, { useState } from "react";
import { TmButton, TmCard, TmNavBar, TmPopup, TmSpace } from "tmdesign";

import { View } from "@tarojs/components";

function DemoPopup() {
  const [isShow, setIsShow] = useState(false);

  const [motion, setMotion] = useState<any>("fade");

  const [position, setPosition] = useState<any>("center");

  const handleHide = () => {
    setIsShow(!isShow);
  };

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"弹出层"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"动画效果"}>
        <TmSpace>
          <TmButton onClick={handleHide}>渐变</TmButton>
          <TmButton
            onClick={() => {
              handleHide();
              setMotion("slide-up");
            }}
          >
            滑动
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"位置"}>
        <TmSpace>
          <TmButton
            onClick={() => {
              handleHide();
              setPosition("top");
              setMotion("fade");
            }}
          >
            上
          </TmButton>
          <TmButton
            onClick={() => {
              handleHide();
              setPosition("center");
              setMotion("fade");
            }}
          >
            中
          </TmButton>
          <TmButton
            onClick={() => {
              handleHide();
              setPosition("bottom");
              setMotion("fade");
            }}
          >
            下
          </TmButton>
          <TmButton
            onClick={() => {
              handleHide();
              setPosition("left");
              setMotion("fade");
            }}
          >
            左
          </TmButton>
          <TmButton
            onClick={() => {
              handleHide();
              setPosition("right");
              setMotion("fade");
            }}
          >
            右
          </TmButton>
        </TmSpace>
      </TmCard>

      <TmPopup
        tmShow={isShow}
        tmMotion={motion}
        onMaskClick={handleHide}
        tmPosition={position}
      >
        <View
          style={{ width: "200px", height: "200px", background: "white" }}
        />
      </TmPopup>

      <View
        style={{
          height: "300vh",
          width: "90vw",
        }}
      ></View>
    </View>
  );
}

export default DemoPopup;
