import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./HomeCard.css"

const HomeCard = ( {item}) => {
  // const itemImageUrl = item.images.reduce((min, currentProduct) => {
  //   return currentProduct.id < minProduct.id ? currentProduct : minProduct;
  // });

  return (
    <Card sx={{ maxWidth: "240px"}} className="shadow">
      <Box
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" className="bg-[#DD5746] p-2 rounded-r-lg">
          Giảm {item.discountPercent}%
        </Typography>
        <Typography variant="body2" className="text-[#8576FF]">Trả góp 0 %</Typography>
      </Box>
      <CardMedia
        className="w-full h-[30%] object-cover"
        component="img"
        image={item.images[0].imageUrl}
      ></CardMedia>
      <CardContent>
        <Typography variant="subtitle2" className="line-clamp-1">
          {item.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            mb: 3,
          }}
        >
          <Typography variant="body2" className="text-[#DD5746]">
            {item.discountedPrice}<span className="text-[#DD5746] underline">đ</span>
          </Typography>
          <Typography variant="body2" className="line-through">
            {item.price}<span className="underline">đ</span>
          </Typography>
        </Box>

        <div className="flex justify-between">
          <Rating
            name="half-rating"
            defaultValue={5}
            precision={1}
            sx={{ fontSize: "18px" }}
          />
          <Box sx={{ display: "flex" }}>
            <FavoriteIcon className="hover:text-[#DD5746] "/>
            <Typography variant="body2">Yêu thích</Typography>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
