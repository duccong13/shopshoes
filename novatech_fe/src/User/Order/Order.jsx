import React, { useEffect, useState } from "react";
import { orderData } from "./orderData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EastIcon from "@mui/icons-material/East";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import {
  Avatar,
  AvatarGroup,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Link,
  Slide,
  Step,
  StepLabel,
  Stepper,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderById, orderHistory } from "../../State/User/Order/Action";
import Detail from "./Detail";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getDateFromISO(isoString) {
  const date = isoString.split("T")[0];
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

// const steps = ["PLACED", "PROCESSED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const Order = () => {
  const dispatch = useDispatch();
  const { uorder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(orderHistory());
    }
  }, [jwt, uorder.deleteOrder]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrderById(orderId))
  };

  const formatMoney = (data) => {
    return data && data.toLocaleString("vi-VN");
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between p-5">
        <Breadcrumbs
          separator={<NavigateNextIcon />}
          aria-label="breadcrumb"
          className="text-blue-500"
        >
          <Link underline="hover" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" href="#">
            Đơn hàng
          </Link>
        </Breadcrumbs>
        <Button>
          Quay Lại
          <EastIcon />
        </Button>
      </div>
      <div className="mt-8 mb-8 flex flex-col gap-12 p-5">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Danh sách đơn hàng
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Ảnh sản phẩm",
                    "Ngày đặt",
                    "Số lượng",
                    "Tổng tiền (đ)",
                    "Trạng Thái",
                    "",
                    "",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-sm font-semibold uppercase text-[#333]"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uorder.orders &&
                  uorder.orders.result &&
                  uorder.orders.result
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, key) => {
                      const className = `py-3 px-5 ${
                        key === item.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr>
                          <td className={className}>
                            <AvatarGroup className="flex justify-end">
                              {item.orderItems.map((item2) =>
                                item2.product.images.map(
                                  ({ imageId, imageUrl }) => (
                                    <Tooltip title={imageId}>
                                      <Avatar
                                        src={imageUrl}
                                        alt={imageId}
                                        size="xs"
                                        className={`cursor-pointer border-2 border-white ${
                                          key === 0 ? "" : "-ml-2.5"
                                        }`}
                                      />
                                    </Tooltip>
                                  )
                                )
                              )}
                            </AvatarGroup>
                          </td>
                          <td className={className}>
                            <Typography className="text-md text-[#333]">
                              {getDateFromISO(item.orderDate)}
                            </Typography>
                          </td>
                          <td>
                            <Typography className="text-md text-[#333] text-center">
                              {item.totalItems}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-md text-[#DD5746]">
                              {formatMoney(item.totalDiscountedPrice)}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={
                                item.status === "PENDING"
                                  ? "red"
                                  : item.status === "CONFIRMED"
                                  ? "yellow"
                                  : item.status === "SHIPPED"
                                  ? "blue"
                                  : "green"
                              }
                              value={item.status}
                              className="py-1 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className={className}>
                            <Button
                              variant="contained"
                              startIcon={<RemoveRedEyeIcon />}
                              sx={{ color: "white" }}
                              onClick={handleClickOpen}
                            >
                              Chi tiết
                            </Button>
                            <Dialog
                              open={open}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose}
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle>
                                {"Thông tin vận chuyển"}
                              </DialogTitle>
                              <div className="p-5">
                                <Detail status={item.status} />
                              </div>
                              <DialogActions>
                                <Button onClick={handleClose}>Xác nhận</Button>
                                <Button onClick={handleClose}>Thoát</Button>
                              </DialogActions>
                            </Dialog>
                          </td>
                          {item.status === "PENDING" ? (
                            <td className={className}>
                              <Button
                                variant="text"
                                startIcon={<CancelIcon />}
                                sx={{ color: "red" }}
                                onClick={() => handleDeleteOrder(item.orderId)}
                              >
                                Hủy đơn
                              </Button>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex justify-center">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={
                uorder.orders &&
                uorder.orders.result &&
                uorder.orders.result.length
              }
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Hàng trên mỗi trang"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* <Pagination count={10} color="secondary"></Pagination> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Order;
