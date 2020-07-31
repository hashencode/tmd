import "../demoStyle.scss";

import React, { useState } from "react";
import {
  TmButton,
  TmCard,
  TmIcon,
  TmImage,
  TmModal,
  TmNavBar
} from "../../../components";

import { View } from "@tarojs/components";

function DemoModal() {
  const togglePopup = id => {
    setCurrentPopup(id);
  };

  const [currentPopup, setCurrentPopup] = useState(0);

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"对话框"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"基础"}>
        <TmButton
          onClick={() => {
            togglePopup(1);
          }}
        >
          无取消按钮
        </TmButton>
        <TmModal
          tmShow={currentPopup === 1}
          tmTitle={"标题"}
          tmDesc={"描述文字"}
          tmCancelText={""}
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义图标"}>
        <TmButton
          onClick={() => {
            togglePopup(2);
          }}
        >
          有取消按钮
        </TmButton>
        <TmModal
          tmShow={currentPopup === 2}
          tmIcon={
            <TmIcon
              tmValue={"chenggong_fill"}
              tmSize={100}
              tmColor={"#52c41a"}
            />
          }
          tmTitle={"标题"}
          tmDesc={"描述文字"}
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"自定义头部和底部"}>
        <TmButton
          onClick={() => {
            togglePopup(3);
          }}
        >
          图片头部
        </TmButton>
        <TmModal
          tmShow={currentPopup === 3}
          tmTitle={"标题"}
          tmDesc={"描述文字"}
          tmHead={
            <TmImage
              tmRatio={0.4}
              tmSrc={
                "https://yanxuan.nosdn.127.net/c53e8279c43273c4cde5eec5faae018d.jpg"
              }
            />
          }
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"内置状态"}>
        <TmButton
          onClick={() => {
            togglePopup(4);
          }}
        >
          错误弹窗
        </TmButton>
        <TmModal
          tmShow={currentPopup === 4}
          tmType={"error"}
          tmTitle={"错误"}
          tmDesc={"操作失败请重试"}
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"点击遮罩关闭"}>
        <TmButton
          onClick={() => {
            togglePopup(5);
          }}
        >
          弹窗
        </TmButton>
        <TmModal
          tmShow={currentPopup === 5}
          tmTitle={"标题"}
          tmDesc={"描述文字"}
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"显示关闭按钮"}>
        <TmButton
          onClick={() => {
            togglePopup(6);
          }}
        >
          可关闭
        </TmButton>
        <TmModal
          tmClosable
          tmShow={currentPopup === 6}
          tmTitle={"标题"}
          tmDesc={"描述文字"}
          onClose={() => {
            setCurrentPopup(0);
          }}
          onCancel={() => {
            setCurrentPopup(0);
          }}
          onConfirm={() => {
            setCurrentPopup(0);
          }}
        />
      </TmCard>
    </View>
  );
}

export default DemoModal;
