import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeCard from "./HomeCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../State/Admin/Product/Action";

const HomeSectionCarosel = () => {
  const {aproduct} = useSelector(store => store);
  const dispatch = useDispatch();
  console.log("Data", aproduct)
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [])
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const items = aproduct.products && aproduct.products.data && aproduct.products.data.result
    .slice(activeIndex, activeIndex + 10)
    .map((item, index) => <HomeCard key={index} item={item} />);

  return (
    <div>
      <Typography variant="h5" className="mx-24 text-black text-2xl">
        Sản Phẩm Nổi Bật
      </Typography>
      <div className="relative p-5 mt-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {items && activeIndex !== items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "10rem",
              right: "-2rem",
              transform: "rotate(90deg)",
              bgcolor: "white",
            }}
          >
            <ArrowForwardIosIcon
              sx={{ transform: " rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
        {activeIndex !== 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "10rem",
              left: "-2rem",
              transform: "rotate(90deg)",
              bgcolor: "white",
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
