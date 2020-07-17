import "../demoStyle.scss";

import {TmCard, TmImage, TmNavBar, TmNavGrid} from "../../../components";

import React from "react";
import TmNavGridItem from "../../../components/navGrid/navGridItem";
import {View} from "@tarojs/components";

function DemoNavGrid() {
  const data = [
    {
      image:
        "https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png",
      text: "新品首发",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png",
      text: "居家生活",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/896a3beac514ae8f40aafe028e5fec56.png",
      text: "服饰箱包",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/37520d1204a0c55474021b43dac2a69e.png",
      text: "美食酒水",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/6c3bd9d885c818b1f73e497335a68b47.png",
      text: "个护清洁",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/559d2a240ec20b096590a902217009ff.png",
      text: "母婴亲子",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/5c088559ebcc3f0ffcda663f04dfbeb2.png",
      text: "运动旅行",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/fbca8e1f2948f0c09fc7672c2c125384.png",
      text: "数码家电",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/f7281169d4e82d5d8d52aa1fec83fe01.png",
      text: "全球特色",
    },
    {
      image:
        "https://yanxuan.nosdn.127.net/12e8efd15b9b210ab156a7ee9b340548.gif",
      text: "好货抄底",
    },
  ];

  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"导航宫格"}/>
      <TmCard tmRound className={"demo__card"} tmTitle={"纵向"}>
        <TmNavGrid>
          {data.slice(0, 5).map(({image, text}, index) => {
            return (
              <TmNavGridItem
                key={index}
                tmImage={
                  <TmImage tmSrc={image} tmRatio={1} style={{width: "80%"}}/>
                }
                tmText={text}
                style={{width: "20%"}}
              />
            );
          })}
        </TmNavGrid>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"横向"}>
        <TmNavGrid tmHorizon>
          {data.slice(0, 3).map(({image, text}, index) => {
            return (
              <TmNavGridItem
                key={index}
                tmImage={
                  <TmImage tmSrc={image} tmRatio={1} style={{width: "40%"}}/>
                }
                tmText={text}
                style={{width: "33.3%"}}
              />
            );
          })}
        </TmNavGrid>
      </TmCard>
      <TmCard tmRound className={"demo__card"} tmTitle={"间距"}>
        <TmNavGrid tmSpace={10} tmTextSpace={10}>
          {data.slice(0, 8).map(({image, text}, index) => {
            return (
              <TmNavGridItem
                key={index}
                tmImage={
                  <TmImage tmSrc={image} tmRatio={1} style={{width: "80%"}}/>
                }
                tmText={text}
                style={{width: "25%"}}
              />
            );
          })}
        </TmNavGrid>
      </TmCard>
    </View>
  );
}

export default DemoNavGrid;
