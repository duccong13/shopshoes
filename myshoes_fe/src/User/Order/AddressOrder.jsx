import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StepperOrder from "./StepperOrder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EastIcon from "@mui/icons-material/East";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getAddress } from "../../State/User/Address/Action";
import AddressCard from "./AddressCard";
import { createOrder } from "../../State/User/Order/Action";
// import { createOrder } from "../../State/User/Order/Action";

const AddressOrder = () => {
  
  const {address} = useSelector(store=>store);

  const {uorder} = useSelector(store =>store);

  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    firstName:"",
    lastName:"",
    streetAddress:"",
    city:"",
    state:"",
    phone:""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  useEffect(() => {
    dispatch(getAddress());
  }, [address.address])

  const handleOrder = () => {
    dispatch(createAddress(productData));
    alert("Tạo địa chỉ thành công")
  }

  return (
    <div>

    <Grid container>
      <Grid
        item
        xs={12}
        mt={2}
        mx={10}
        container
        justifyContent={"space-between"}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon />}
          aria-label="breadcrumb"
          className="text-blue-500"
        >
          <Link underline="hover" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" href="#">
            Giỏ hàng
          </Link>
          <Link underline="hover" href="#">
            Địa chỉ giao hàng
          </Link>
        </Breadcrumbs>
        <Button>
          Quay Lại
          <EastIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={10}>
        <StepperOrder step={1} />
      </Grid>
      <Grid item xs={3} mt={10} ml={10} container spacing={2}>
        {
          address.addresses && address.addresses.result && address.addresses.result.map((item) => (
            <AddressCard address={item}/>
          ))
        }
      </Grid>
      <Grid item xs={6} mt={10} mx={10}>
        <h2 className="text-2xl font-bold text-[#333] p-2 border-1 border-b">
          <EditIcon />
          Nhập địa chỉ giao hàng của bạn
        </h2>
        <form className="mt-10">
          <div>
            <h3 className="text-lg font-bold text-[#333] mb-6">
              👤Thông tin cá nhân
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  name="firstName"
                  value={productData.firstName}
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  name="lastName"
                  value={productData.lastName}
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  name="email"
                  value={productData.email}
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  name="phone"
                  value={productData.phone}
                  onChange={handleChange}
                />
                <svg
                  fill="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold text-[#333] mb-6">
              🚛Thông tin địa chỉ giao hàng
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Address Line"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                name="streetAddress"
                value={productData.streetAddress}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                name="city"
                value={productData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="State"
                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                name="state"
                value={productData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-6 max-sm:flex-col mt-10">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]"
              >
                Hủy
              </button>
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]"
                onClick={() => handleOrder()}
              >
                Tạo địa chỉ
              </button>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
    </div>
  );
};

export default AddressOrder;

{/* <Box sx={{ display: 'flex', justifyContent:"center"}}>
<CircularProgress />
</Box> */}
