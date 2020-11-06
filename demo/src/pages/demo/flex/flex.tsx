import "../demoStyle.scss";

import { TmButton, TmCard, TmCol, TmDivider, TmNavBar, TmRow } from "tmdesign";

import React from "react";
import { View } from "@tarojs/components";

function DemoFlex() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"栅格"} />
      <TmCard tmRound className={"demo__card"} tmTitle={"间距"}>
        <TmRow tmGutter={8}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={6} key={index}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"对齐"}>
        <TmRow tmGutter={8} tmJustify={"flex-start"}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={4} key={`flex-start-${index}`}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
        <TmDivider />
        <TmRow tmGutter={8} tmJustify={"center"}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={4} key={`center-${index}`}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
        <TmDivider />
        <TmRow tmGutter={8} tmJustify={"flex-end"}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={4} key={`flex-end-${index}`}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
        <TmDivider />
        <TmRow tmGutter={8} tmJustify={"space-around"}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={4} key={index}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
        <TmDivider />
        <TmRow tmGutter={8} tmJustify={"space-between"}>
          {Array(4)
            .fill("")
            // @ts-ignore
            .map((item, index) => {
              return (
                <TmCol tmSpan={4} key={index}>
                  <TmButton tmType={"primary"} tmBlock />
                </TmCol>
              );
            })}
        </TmRow>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"尺寸"}>
        <TmRow tmGutter={8}>
          <TmCol tmSpan={16}>
            <TmButton tmType={"primary"} tmBlock>
              Push 8
            </TmButton>
          </TmCol>
          <TmCol tmSpan={8}>
            <TmButton tmType={"primary"} tmBlock>
              Pull 16
            </TmButton>
          </TmCol>
        </TmRow>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"位移"}>
        <TmRow tmGutter={8}>
          <TmCol tmSpan={16} tmPush={8}>
            <TmButton tmType={"primary"} tmBlock>
              Push 8
            </TmButton>
          </TmCol>
          <TmCol tmSpan={8} tmPull={16}>
            <TmButton tmType={"primary"} tmBlock>
              Pull 16
            </TmButton>
          </TmCol>
        </TmRow>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"排序"}>
        <TmRow tmGutter={8}>
          <TmCol tmSpan={16} tmOrder={2}>
            <TmButton tmType={"primary"} tmBlock>
              Order 1
            </TmButton>
          </TmCol>
          <TmCol tmSpan={8} tmOrder={1}>
            <TmButton tmType={"primary"} tmBlock>
              Order 2
            </TmButton>
          </TmCol>
        </TmRow>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"偏移量"}>
        <TmRow tmGutter={8}>
          <TmCol tmSpan={16} tmOffset={8}>
            <TmButton tmType={"primary"} tmBlock>
              Offset 8
            </TmButton>
          </TmCol>
        </TmRow>
      </TmCard>
    </View>
  );
}

export default DemoFlex;
