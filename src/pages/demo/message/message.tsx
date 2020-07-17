import "../demoStyle.scss";

import React, {useState} from "react";
import {TmButton, TmCard, TmIcon, TmMessage, TmNavBar, TmSpace,} from "../../../components";

import {View} from "@tarojs/components";

function DemoMessage() {
  const [currentKey, setCurrentKey] = useState(0);

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"消息"}/>
      <TmCard tmRound className={"demo__card"}>
        <TmButton
          onClick={() => {
            setCurrentKey(1);
          }}
        >
          显/隐
        </TmButton>
        <TmMessage tmType={"loading"} tmShow={currentKey === 1}>
          加载中
        </TmMessage>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"内置状态"}>
        <TmSpace>
          <TmButton
            onClick={() => {
              setCurrentKey(2);
            }}
          >
            错误
          </TmButton>
          <TmButton
            onClick={() => {
              setCurrentKey(3);
            }}
          >
            成功
          </TmButton>
        </TmSpace>

        <TmMessage tmShow={currentKey === 2} tmType={"error"}>
          错误
        </TmMessage>
        <TmMessage tmShow={currentKey === 3} tmType={"success"}>
          成功
        </TmMessage>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义图标"}>
        <TmButton
          onClick={() => {
            setCurrentKey(4);
          }}
        >
          显/隐
        </TmButton>
        <TmMessage
          tmShow={currentKey === 4}
          tmIcon={<TmIcon tmValue={"maikefeng"} tmSize={36}/>}
        >
          录音中
        </TmMessage>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"显示位置"}>
        <TmSpace>
          <TmButton
            onClick={() => {
              setCurrentKey(5);
            }}
          >
            顶部
          </TmButton>
          <TmButton
            onClick={() => {
              setCurrentKey(6);
            }}
          >
            底部
          </TmButton>
        </TmSpace>
        <TmMessage tmPosition={"top"} tmShow={currentKey === 5}>
          顶部
        </TmMessage>
        <TmMessage tmPosition={"bottom"} tmShow={currentKey === 6}>
          底部
        </TmMessage>
      </TmCard>
    </View>
  );
}

export default DemoMessage;
