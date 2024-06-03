import React, { useEffect, useState } from "react";
import productTable from "../Data/productTable";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../State/Admin/Product/Action";

export const ManageProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { aproduct } = useSelector((store) => store);
  console.log(aproduct)

  useEffect(() => {
    dispatch(getAllProducts());
  }, [aproduct.deleteProducts, aproduct.updateProducts]);

  const handleSort = (data) => {
    if (data === "price_low") {
      aproduct.products.data.result.sort((a, b) => {
        return a.discountedPrice - b.discountedPrice;
      });
    } else if (data === "price_high") {
      aproduct.products.data.result.sort((a, b) => {
        return b.discountedPrice - a.discountedPrice;
      });
    }
  };

  const handleFindCategory = (data) => {
    return aproduct.products.data.result.filter((item) => {
      if (
        item.category &&
        item.category.parentCategory &&
        item.category.parentCategory.parentCategory &&
        item.category.parentCategory.parentCategory.categoryName
      ) {
        return (
          item.category.parentCategory.parentCategory.categoryName === data
        );
      }
      return false;
    });
  };

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenUpdate = (productId) => {
    console.log(productId)
    setOpenUpdate(true);
    setCurrentProductId(productId);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setCurrentProductId("");
  };

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    const quantityValue = parseInt(value);
    setDataUpdate((prev) => ({
      ...prev,
      [name]: isNaN(quantityValue) ? "" : quantityValue,
    }));
  };

  const [dataUpdate, setDataUpdate] = useState({
    quantity: "",
  });
  const [currentProductId, setCurrentProductId] = useState(null);


  const [inputCategory, setInputCategory] = React.useState("");

  const handleChangeCategory = (event) => {
    setInputCategory(event.target.value);
  };
  const [inputPrice, setInputPrice] = React.useState("");

  const handleChangePrice = (event) => {
    setInputPrice(event.target.value);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(currentProductId, dataUpdate));
    handleCloseUpdate();
  };

  const formatMoney = (data) => {
    return data && data.toLocaleString("vi-VN");
  };

  return (
    <div className="mt-10">
      <div>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Danh sách sản phẩm
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
                    Lọc theo danh mục
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={inputCategory}
                    onChange={handleChangeCategory}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      value="phone"
                      onClick={() => handleFindCategory("phone")}
                    >
                      Điện thoại
                    </MenuItem>
                    <MenuItem
                      value="lapTop"
                      onClick={() => handleFindCategory("laptop")}
                    >
                      LapTop
                    </MenuItem>
                    <MenuItem
                      value="watch"
                      onClick={() => handleFindCategory("watch")}
                    >
                      Đồng Hồ
                    </MenuItem>
                    <MenuItem
                      value="headPhone"
                      onClick={() => handleFindCategory("headPhone")}
                    >
                      Tai nghe
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    sx={{ fontSize: 14 }}
                  >
                    Sắp xếp theo giá
                  </InputLabel>
                  <Select
                    name="sort"
                    label="Sort to Price"
                    onChange={handleChangePrice}
                    value={inputPrice}
                    sx={{ color: "black" }}
                  >
                    <MenuItem value="" onClick={() => handleSort("")}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      value="price_low"
                      onClick={() => handleSort("price_low")}
                    >
                      Tăng dần
                    </MenuItem>
                    <MenuItem
                      value="price_high"
                      onClick={() => handleSort("price_high")}
                    >
                      Giảm dần
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Thêm sản phẩm
              </Button>
            </div>
            <AddProduct open={open} handleClose={handleClose} />
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "Ảnh", "Tên sản phẩm", "Giá bán", "Số lượng", ""].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="body2"
                          className=" text-[#333] font-semibold"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {aproduct.products && aproduct.products.data &&
                  aproduct.products.data.result
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, key) => {
                      const className = `py-3 px-5 ${
                        key === aproduct.products.data.result.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={item.productId}>
                          <td className={className}>
                            <Typography
                              variant="body2"
                              className="text-sm text-[#333]"
                            >
                              {item.productId}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Tooltip key={item.productId} content={item.name}>
                              <Avatar
                                src={item.images[0].imageUrl}
                                alt={item.productId}
                                size="md"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="body2"
                              className="text-sm text-[#333] line-clamp-1"
                            >
                              {item.name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="body2"
                              className="text-sm text-[#333]"
                            >
                              {formatMoney(item.discountedPrice)}đ
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="body2"
                              className="text-sm text-[#333]"
                            >
                              {item.quantity}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Button
                              variant="text"
                              sx={{ color: "#FEB941", marginRight: 5 }}
                              startIcon={<UpdateIcon />}
                              onClick={() => handleOpenUpdate(item.productId)}
                            >
                              Cập Nhật
                            </Button>
                            <Dialog
                              open={openUpdate}
                              onClose={handleCloseUpdate}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Nhập số lượng"}
                              </DialogTitle>
                              <DialogContent>
                                <TextField
                                  variant="standard"
                                  name="quantity"
                                  onChange={handleTextFieldChange}
                                  value={dataUpdate.quantity}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleUpdateProduct}>
                                  Cập nhật
                                </Button>
                                <Button onClick={handleCloseUpdate} autoFocus>
                                  Hủy
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Button
                              variant="text"
                              sx={{ color: "red" }}
                              startIcon={<DeleteIcon />}
                              onClick={() =>
                                handleDeleteProduct(item.productId)
                              }
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
                aproduct.products && aproduct.products.data && aproduct.products.data.result.length
              }
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Hàng trên mỗi trang"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ManageProduct;
