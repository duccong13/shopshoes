import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Slide,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EastIcon from "@mui/icons-material/East";
import StepperOrder from "./StepperOrder";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../State/User/Payment/Action";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BoltIcon } from "@heroicons/react/20/solid";
import { createOrder, deleteOrderById } from "../../State/User/Order/Action";
const data = [
  {
    id: 0,
    logo: "https://cdn-icons-png.flaticon.com/512/10751/10751558.png",
    content: "Thanh toán khi nhận hàng",
  },
  {
    id: 1,
    logo: "https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg",
    content: "Thanh toán qua momo",
  },
  {
    id: 2,
    logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png",
    content: "Thanh toán qua VNPay",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton onClick={() => handleListItemClick(item)}>
              <img src={item.logo} className="w-8 h-8 object-cover mr-5"></img>
              <Typography variant="body2">{item.content}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.PropTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const PaymentOrder = () => {
  const { payment } = useSelector((store) => store);
  //console.log(payment)
  const { uorder } = useSelector((store) => store);
  console.log(uorder)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState({
    id: data[0].id,
    content: data[0].content,
  });

  const [open, setOpen] = useState(false);
  const handlePayment = (orderId) => {
    if (selectedValue.id === 0) {
      navigate("/order_return");
    } else if (selectedValue.id === 2) {
      dispatch(createPayment(orderId));
      setTimeout(() => {
        window.location.href = `${payment.payment.url}`;
      }, 1000);
    } else {
    }
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrderById(orderId));
    navigate("/");
  };

  const handleCLickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const formatMoney = (data) => {
    return data && data.toLocaleString("vi-VN");
  };

  return (
    <>
      <Grid container color={"#333"}>
        <Grid
          item
          container
          xs={12}
          mx={10}
          mt={5}
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
            <Link underline="hover" href="#">
              Thanh toán
            </Link>
          </Breadcrumbs>
          <Button>
            Quay Lại
            <EastIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <StepperOrder step={2} />
        </Grid>
        <Grid item xs={5} mx={10}>
          <p className="text-xl font-medium">Danh sách sản phẩm</p>
          <p className="text-gray-400">
            Kiểm tra lại các mục và lựa chọn phương thức thanh toán phù hợp.
          </p>
          <div className="mt-8 space-y-3 rounded-lg shadow-lg bg-white px-2 py-4 sm:px-6">
            {uorder.order &&
              uorder.order.result &&
              uorder.order.result.orderItems.map((item) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.product.images[0].imageUrl}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="float-right text-gray-400">
                      Màu: {item.color}
                    </span>
                    <span className="float-right text-gray-400">
                      Số lượng: {item.quantity}
                    </span>
                    <p className="text-lg font-bold text-[#DD5746]">
                      Tổng tiền:  {formatMoney(item.discountedPrice)}đ
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-8 text-lg font-medium">Phương thức vận chuyển</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="data:image/png;base64,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"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Giao hàng nhanh</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Vận chuyển: 1-2 Ngày
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="data:image/png;base64,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"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Giao hàng bình thường
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Vận chuyển: 2-4 Ngày
                  </p>
                </div>
              </label>
            </div>
          </form>
        </Grid>
        <Grid item xs={5} mr={10}>
          <p className="text-xl font-medium">Chi tiết thanh toán</p>
          <p className="text-gray-400">
            Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán
            của bạn.
          </p>
          <div className="my-5 p-5 shadow w-[80%] grid gap-5">
            <Button
              variant="contained"
              onClick={handleCLickOpen}
              className="w-[65%]"
            >
              Hình thức thanh toán
            </Button>
            <Typography variant="body2" component="div" className="text-[#333]">
              Phương thức thanh toán:
              <span className="text-[#DD5746] ml-5">
                {selectedValue.content}
              </span>
            </Typography>
            <img
              className="w-24 h-24"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Voucher.gif"
            ></img>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClickClose}
            />
          </div>
          <div className="">
            <div className="my-6 border-t border-b py-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng hàng</p>
                <p className="font-semibold text-[#DD5746]">
                  {formatMoney(
                    uorder.order &&
                      uorder.order.result &&
                      uorder.order.result.totalDiscountedPrice
                  )}{" "}
                  đ
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Phí vận chuyển
                </p>
                <p className="font-semibold text-gray-900">
                  {formatMoney(-15000)}đ
                </p>
              </div>
            </div>
            <div className="my-6 flex items-center justify-between">
              <p className="text-lg text-gray-900">Tổng trả</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatMoney(
                  uorder.order &&
                    uorder.order.result &&
                    uorder.order.result.totalDiscountedPrice - 15000
                )}
                đ
              </p>
            </div>
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              handlePayment(uorder.order && uorder.order.result.orderId)
            }
            sx={{ marginBottom: 2 }}
          >
            Thanh toán
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: 4 }}
            onClick={handleClickOpen1}
          >
            {" "}
            HỦY ĐƠN HÀNG
          </Button>
          <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có chắc muốn hủy đơn hàng này"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => handleDeleteOrder(uorder.order && uorder.order.result.orderId)}>Xác nhận</Button>
              <Button onClick={handleClose1} autoFocus>
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentOrder;
