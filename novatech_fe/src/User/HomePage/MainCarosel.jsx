import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCaroselData } from "./MainCaroselData";

const MainCarosel = () => {
  const items = MainCaroselData.map((item) => (
    <img
      className="cursor-pointer w-full"
      role="presentation"
      src={item.link}
      alt=""
    ></img>
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      controlsStrategy="alternate"
      autoPlay
      autoPlayInterval={1500}
      infinite
    />
  );
};

export default MainCarosel;
