import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "../User/Auth/Signin";
import SignUp from "../User/Auth/Signup";
import HomePage from "../User/HomePage/HomePage";
import Cart from "../User/Cart/Cart";
import Order from "../User/Order/Order";
import DetailsProduct from "../User/Product/DetailsProduct";
import Navigation from "../User/Nav/Navigation";
import FilterProduct from "../User/Product/FilterProduct";
import AddressOrder from "../User/Order/AddressOrder";
import PaymentOrder from "../User/Order/PaymentOrder";
import PaymentReturn from "../User/Order/PaymentReturn";
import { useSelector } from "react-redux";
import Message from "../User/HomePage/Message";
import OrderReturn from "../User/Order/OrderReturn";
import Info from "../User/Profile/Info";
import History from "../User/Profile/History";
import ProfileMain from "../User/Profile/ProfileMain";
import Support from "../User/Profile/Support";
import Address from "../User/Profile/Address";
import { Box, CircularProgress } from "@mui/material";

const UserRouters = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const auth = useSelector((store) => store);
  const shouldDisplayNavigation = () => {
    return !(
      location.pathname === "/auth/signin" ||
      location.pathname === "/auth/signup" ||
      location.pathname === "/payment_return"
    );
  };
  const jwt = localStorage.getItem("jwt");
  return (
    <div className="relative">
      {shouldDisplayNavigation() && <Navigation setLoading={setLoading} />}
      <Routes>
        <Route path="/auth/signin" element={<SignIn />}></Route>
        <Route path="/auth/signup" element={<SignUp />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/delivery" element={<AddressOrder />}></Route>
        <Route path="/payment" element={<PaymentOrder />}></Route>
        <Route path="/product/:productId" element={<DetailsProduct />}></Route>
        <Route path="/user" element={<ProfileMain />}>
          <Route path="/user/info" element={<Info />} />
          <Route path="/user/history" element={<History />} />
          <Route path="/user/address" element={<Address />} />
          <Route path="/user/vip" element={<History />} />
          <Route path="/user/support" element={<Support />} />
        </Route>
        <Route path="/:categoryName" exact element={<FilterProduct />}></Route>
        <Route path="/payment_return" element={<PaymentReturn />}></Route>
        <Route path="/order_return" element={<OrderReturn />}></Route>
      </Routes>
      {jwt ? (
        <div className="z-50 fixed bottom-10 right-10">
          <Message />
        </div>
      ) : null}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 30,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default UserRouters;
