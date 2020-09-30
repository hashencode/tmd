import "../demoStyle.scss";

import React, { useState } from "react";
import { TmButton, TmCard, TmDrawer, TmNavBar, TmSpace } from "tmdesign";

import { View } from "@tarojs/components";

function DemoDrawer() {
  const togglePopup = (id) => {
    setCurrentPopup(id);
  };

  const [currentPopup, setCurrentPopup] = useState(0);

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"抽屉"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"方向"}>
        <TmSpace>
          <TmButton
            onClick={() => {
              togglePopup(1);
            }}
          >
            底部
          </TmButton>
          <TmButton
            onClick={() => {
              togglePopup(2);
            }}
          >
            左侧
          </TmButton>
        </TmSpace>
      </TmCard>
      <TmDrawer
        tmShow={currentPopup === 1}
        tmPosition={"bottom"}
        tmCancel={"取消"}
        tmConfirm={"确定"}
        tmTitle={"支付订单"}
        onMaskClick={() => {
          setCurrentPopup(0);
        }}
        tmFooter={
          <View>
            <TmButton tmType={"primary"} tmBlock tmSize={"lg"}>
              立即支付
            </TmButton>
          </View>
        }
        onCancel={() => {
          setCurrentPopup(0);
        }}
        onConfirm={() => {
          setCurrentPopup(0);
        }}
      >
        <View style={{ width: "300px", height: "300px" }} />
      </TmDrawer>
      <TmDrawer
        tmShow={currentPopup === 2}
        tmPosition={"left"}
        tmTitle={"高级搜索"}
        tmConfirm={
          <TmButton tmType={"primary"} tmBlock tmSize={"lg"}>
            确认
          </TmButton>
        }
        tmCancel={
          <TmButton tmType={"default"} tmBlock tmSize={"lg"}>
            取消
          </TmButton>
        }
        onMaskClick={() => {
          setCurrentPopup(0);
        }}
        onCancel={() => {
          setCurrentPopup(0);
        }}
        onConfirm={() => {
          setCurrentPopup(0);
        }}
      />
    </View>
  );
}

export default DemoDrawer;
