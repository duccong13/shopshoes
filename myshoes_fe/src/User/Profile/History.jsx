import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHistory } from "../../State/User/Order/Action";

const History = () => {
  const dispatch = useDispatch();
  const {uorder}= useSelector(store => store);
  console.log(uorder)
  useEffect(() => {
    dispatch(orderHistory());
  }, [])

  const formatNumber = (number) => {
    return number && number.toLocaleString('vi-VN');
  };

  const handleOrderPrice = (data) => {
      return  formatNumber(data && data.reduce((acc, cur) => acc + cur.totalDiscountedPrice, 0));
  }

  return (
    <div>
      <Typography variant="h6" sx={{padding:2, marginLeft: 4, color:"black", fontWeight:700}}>Lịch sử giao hàng</Typography>
      <Grid container>
        <Grid item xs={12} container sx={{ bgcolor: "#FFFDB5", height:"100px" }} mx={5}>
          <Grid item xs={6}>
            <div className="m-5 border-r-2 border-r-black text-center text-black">
              <Typography variant="h5">{uorder.orders && uorder.orders.result && uorder.orders.result.length}</Typography>
              <p> đơn hàng </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="m-5 text-center text-black">
              <Typography variant="h5">{handleOrderPrice(uorder.orders && uorder.orders.result)} đ</Typography>
              <p> Tổng tiền tích luỹ </p>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} container mt={5} mx={5} spacing={3}>
          <Grid item xs={2}>
            <Button variant="contained" size="small">Tất cả</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="small">Chờ xác nhận</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="small">Đã xác nhận</Button>
          </Grid>
          <Grid item xs={2.5}>
            <Button variant="contained" size="small">Đang vận chuyển</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" size="small">Đã giao hàng</Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button variant="contained" size="small">Đã hủy</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Grid item xs={12} container justifyContent={"center"} mt={5}>
            <img className="w-[70%] h-[70%]" src="https://cellphones.com.vn/smember/_nuxt/img/empty.db6deab.svg"></img>
          </Grid>
          <Grid item xs={12}>
          <p className="pt-5 text-center">Không có đơn hàng nào thỏa mãn</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default History;
