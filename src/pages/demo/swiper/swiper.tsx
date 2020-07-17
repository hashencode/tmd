import {TmNavBar, TmSwiper} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoSwiper() {
  // useEffect(() => {
  //   setSwiperArray([
  //     "https://yanxuan.nosdn.127.net/c53e8279c43273c4cde5eec5faae018d.jpg",
  //     "https://yanxuan.nosdn.127.net/da2fa802c040d3966677c5a3304a27e6.jpg",
  //   ]);
  // }, []);
  //
  // const [swiperArray, setSwiperArray] = useState<string[]>([]); // swiper图片列表

  return (
    <View>
      <TmNavBar tmTitle={"Swiper"}/>
      <TmSwiper/>
    </View>
  );
}

export default DemoSwiper;
