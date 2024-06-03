import { Grid, Typography } from "@mui/material";
import React from "react";

const Support = () => {
  return (
    <div>
      <Grid container spacing={5} mt={5}>
        <Grid item xs={5}>
          <div className="flex justify-start items-center border rounded-md border-white py-2">
            <img className="mx-5" src="https://cellphones.com.vn/smember/_nuxt/img/headphones%201.c7d474f.png"></img>
            <Typography color={"white"} sx={{marginRight:2}}>Tư Vấn Mua Hàng : </Typography>
            <Typography color={"#DD5746"}>0869.526.280</Typography>
          </div>
        </Grid>
        <Grid item xs={5}>
        <div className="flex justify-start items-center border rounded-md border-white py-2">
            <img className="mx-5" src="https://cellphones.com.vn/smember/_nuxt/img/waranty%201.a9ef39d.png"></img>
            <Typography color={"white"} sx={{marginRight:2}}>Bảo Hành : </Typography>
            <Typography color={"#DD5746"}>0869.526.280</Typography>
          </div>
        </Grid>
        <Grid item xs={5}>
        <div className="flex justify-start items-center border rounded-md border-white py-2">
            <img className="mx-5" src="https://cellphones.com.vn/smember/_nuxt/img/bad-review.ac59f16.png"></img>
            <Typography color={"white"} sx={{marginRight:2}}>Khiếu Nại : </Typography>
            <Typography color={"#DD5746"}>0869.526.280</Typography>
          </div>
        </Grid>
        <Grid item xs={5}>
        <div className="flex justify-start items-center border rounded-md border-white py-2">
            <img className="mx-5" src="https://cellphones.com.vn/smember/_nuxt/img/message%201.259c9d3.png"></img>
            <Typography color={"white"} sx={{marginRight:2}}>Email : </Typography>
            <Typography color={"#DD5746"}>nvanlinh1406@gmail.com</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Support;
