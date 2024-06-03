import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../State/User/Order/Action";
import { useNavigate } from "react-router-dom";

const AddressCard = ({ address }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButton = () => {
    setLoading(true);
    dispatch(createOrder(address.addressId));
    setTimeout(() => {
      navigate("/payment");
    }, 3000);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#333] p-2 border-1 border-b">
        🏡Địa chỉ có sẵn
      </h2>
      <div className="shadow-lg">
        <div className="grid grid-cols-1 gap-3 p-5">
          <p>
            Họ Tên:
            <span className="text-[#333]">
              {" "}
              {address.lastName} {address.firstName}
            </span>
          </p>
          <p>
            Email:
            <span className="text-[#333]"> {address.user.email}</span>
          </p>
          <p className="text-[#333]">{address.streetAddress}</p>
          <p>
            Số điện thoại:{" "}
            <span className="text-[#333]">{address.phone} ☎</span>
          </p>
          <Button
            variant="contained"
            size="medium"
            onClick={() => handleButton()}
          >
            Sử dụng
          </Button>
        </div>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex:10
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
