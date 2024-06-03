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

const HomeCard = () => {
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
          Giảm 28%
        </Typography>
        <Typography variant="body2" className="text-[#8576FF]">Trả góp 0 %</Typography>
      </Box>
      <CardMedia
        className="w-full h-[30%] object-cover"
        component="img"
        image="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png"
      ></CardMedia>
      <CardContent>
        <Typography variant="subtitle2">
          iPhone 13 128GB | Chính hãng VN/A
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
            13.690.000<span className="text-[#DD5746] underline">đ</span>
          </Typography>
          <Typography variant="body2" className="line-through">
            18.990.000<span className="underline">đ</span>
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
