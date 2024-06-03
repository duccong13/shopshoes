import {
  CardBody,
  Card,
  CardHeader,
  Typography,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import orderTable from "../Data/orderTable";
import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveryOrder,
  findOrderStatus,
  getAllOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
import { CSVLink, CSVDownload } from "react-csv";
import ExportData from "./ExportData";

function getDateFromISO(isoString) {
  const date = isoString.split("T")[0];
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

const ManageOrder = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { aorder } = useSelector((store) => store);
  console.log("Order",aorder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [aorder.shipped, aorder.confirmed, aorder.delivered, aorder.deletedOrder]);

  const [anchorEl, setAnchorEl] = React.useState([]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleShipedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveryOrder(orderId));
    handleClose();
  };

  const [dataStatus, setDataStatus] = useState({
    status: "",
    isPayment: null,
  });

  // const handleFindStatus = () => {
  //   dispatch(findOrderStatus(dataStatus));
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [filteredOrders, setFilteredOrders] = useState([]);
  const result = filteredOrders && filteredOrders.map(item => {
    const {orderId, orderDate, address: { addressId }, user: { userId }, status, payment, totalItems, totalDiscountedPrice } = item;
    return {orderId, orderDate, addressId, userId, status, payment, totalItems, totalDiscountedPrice };
  });
  // console.log(result)

  useEffect(() => {
    if (dataStatus.status !== "" || dataStatus.isPayment !== null) {
      const filtered =
        aorder.orders &&
        aorder.orders.result.filter(
          (item) =>
            (dataStatus.status === "" || item.status === dataStatus.status) &&
            (dataStatus.isPayment === "" ||
              item.payment === dataStatus.isPayment)
        );
      setFilteredOrders(filtered);
    } else {
      // If both status and isPayment are empty, display all orders
      setFilteredOrders(aorder.orders.result);
    }
  }, [dataStatus.status, dataStatus.isPayment, aorder.orders.result]);

  const formatMoney = (data) => {
    return data && data.toLocaleString("vi-VN");
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Danh sách đơn hàng
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="flex justify-between items-center p-5">
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ fontSize: 14 }}
                >
                  Lọc theo tình trạng
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="status"
                  value={dataStatus.isPayment}
                  onChange={handleChange}
                  name="isPayment"
                >
                  <MenuItem value={false}>Chưa thanh toán</MenuItem>
                  <MenuItem value={true}>Đã thanh toán</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ fontSize: 14 }}
                >
                  Lọc theo trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="status"
                  value={dataStatus.status}
                  onChange={handleChange}
                  name="status"
                >
                  <MenuItem value="PENDING">Chờ xác nhận</MenuItem>
                  <MenuItem value="CONFIRMED">Xác nhận</MenuItem>
                  <MenuItem value="SHIPPED">Vận chuyển</MenuItem>
                  <MenuItem value="DELIVERED">Hoàn thành</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mr-5">
              <ExportData data={result} />
              {/* <CSVDownload data={aorder.orders && aorder.orders.result} /> */}
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "ID",
                  "Sản phẩm",
                  "Người đặt",
                  "Ngày đặt",
                  "Tổng tiền",
                  "Tình trạng",
                  "Trạng thái",
                  "",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
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
              {filteredOrders && filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .filter((item) => item.status === dataStatus.status)
                .sort((a, b) => new Date(b.orderId) - new Date(a.orderId))
                .map((item, key) => {
                  const index = page * rowsPerPage + key;
                  const className = `py-3 px-5 ${
                    key === aorder.orders.result.length
                      ? ""
                      : "border-b border-blue-gray-50 text-center"
                  }`;

                  return (
                    <tr key={item.orderId}>
                      <td className={className}>
                        <Typography className="text-sm text-[#333]">
                          {item.orderId}
                        </Typography>
                      </td>
                      <td className={className}>
                        <AvatarGroup
                          max={2}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          {item.orderItems.map((item2) =>
                            item2.product.images.map(
                              ({ imageId, imageUrl }) => (
                                <Tooltip key={imageId} content={imageId}>
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
                        <Typography className="text-sm text-[#333]">
                          {item.user.firstName} {item.user.lastName}
                        </Typography>
                        <Typography className="text-sm text-[#333]">
                          {item.user.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm text-[#333]">
                          {getDateFromISO(item.orderDate)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-sm text-[#333] line-through">
                          {formatMoney(item.totalPrice)}đ
                        </Typography>
                        <Typography className="text-md text-[#DD5746]">
                          {formatMoney(item.totalDiscountedPrice)}đ
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={item.payment ? "green" : "red"}
                          value={
                            item.payment ? "Đã thanh toán" : "Chưa thanh toán"
                          }
                          className="font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Button
                          id="basic-button"
                          aria-controls={`basic-menu-${item.orderId}`}
                          aria-haspopup="true"
                          aria-expanded={Boolean(anchorEl[index])}
                          onClick={(e) => handleClick(e, index)}
                        >
                          <span
                            className={`px-5 py-2 rounded-full ${
                              item.status === "CONFIRMED"
                                ? "text-[#e6e600]"
                                : item.status === "SHIPPED"
                                ? "text-[#00bfff]"
                                : item.status === "PLACED"
                                ? "text-[#DD5746]"
                                : item.status === "DELIVERED"
                                ? "text-[#33cc33]"
                                : "text-[#DD5746]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </Button>
                        <Menu
                          id={`basic-menu-${item.orderId}`}
                          anchorEl={anchorEl[index]}
                          open={Boolean(anchorEl[index])}
                          onClose={() => handleClose(index)}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleConfirmedOrder(item.orderId)}
                          >
                            Xác nhận
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleShipedOrder(item.orderId)}
                          >
                            Vận chuyển
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeliveredOrder(item.orderId)}
                          >
                            Hoàn thành
                          </MenuItem>
                        </Menu>
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteOrder(item.orderId)}
                        >
                          Xóa
                        </Button>
                      </td>
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
              aorder.orders &&
              aorder.orders.result &&
              aorder.orders.result.length
            }
            //count={2}
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
  );
};

export default ManageOrder;
