import { Textarea } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Admin/Product/Action";

const AddProduct = ({ open, handleClose }) => {

  const dispatch = useDispatch();

  const [numFields, setNumFields] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Hàm để xử lý sự kiện thay đổi của TextField
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [secondCategory, setSecondCategory] = useState(false);
  const [thirdCategory, setThirdCategory] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    description: "",
    images: [],
    size: [],
    fristLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });


  const handleImageChange = (index, value) => {
    const newImages = [...productData.images];
    newImages[index].imageUrl = value;
    setProductData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...productData.size];
    newSizes[index][field] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: newSizes,
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "firstLevelCategory") {
      setSecondCategory(true);
    } else if (name === "secondLevelCategory") {
      setThirdCategory(true);
    }
  };
  const addImageField = () => {
    setProductData((prevState) => ({
      ...prevState,
      images: [...prevState.images, { imageUrl: "" }],
    }));
  };

  const removeImageField = (index) => {
    const newImages = productData.images.filter((_, i) => i !== index);
    setProductData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const addSizeField = () => {
    setProductData((prevState) => ({
      ...prevState,
      size: [...prevState.size, { description: ""}],
    }));
  };

  const removeSizeField = (index) => {
    const newSize = productData.size.filter((_, i) => i !== index);
    setProductData((prevState) => ({
      ...prevState,
      size: newSize,
    }));
  };

  const handleButton = () => {
    dispatch(createProduct(productData));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thêm sản phẩm"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                name="name"
                label="Tên sản phẩm ..."
                variant="outlined"
                fullWidth
                value={productData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                name="price"
                label="Giá gốc ..."
                variant="outlined"
                value={productData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                name="discountedPrice"
                label="Giá chiết khấu..."
                variant="outlined"
                value={productData.discountedPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                name="discountPercent"
                label="Khuyến mại..."
                variant="outlined"
                value={productData.discountPercent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                name="quantity"
                label="Số lượng..."
                variant="outlined"
                value={productData.quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Textarea
                label="Mô tả ngắn về sản phẩm"
                name="description"
                value={productData.description}
                onChange={handleChange}
              ></Textarea>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                name="fristLevelCategory"
                label="Danh mục cấp 1"
                onChange={handleChange}
                value={productData.fristLevelCategory}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                name="secondLevelCategory"
                label="Danh mục cấp 2"
                onChange={handleChange}
                value={productData.secondLevelCategory}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                name="thirdLevelCategory"
                label="Danh mục cấp 3"
                onChange={handleChange}
                value={productData.thirdLevelCategory}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Danh sách hình ảnh</Typography>
            </Grid>
            <Grid item container spacing={3}>
              {productData.images.map((image, index) => (
                <Grid item xs={5} key={index}>
                  <TextField
                    variant="outlined"
                    placeholder={`Ảnh ${index + 1}`}
                    value={image.imageUrl}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    fullWidth
                  />
                  <Button onClick={() => removeImageField(index)}>
                    Xóa
                  </Button>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button onClick={addImageField}>Thêm hình ảnh</Button>
              </Grid>
            </Grid>

            <Grid item container mt={2} spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Danh sách kích thước</Typography>
              </Grid>
              {productData.size.map((size, index) => (
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"space-between"}
                  key={index}
                >
                  <TextField
                    variant="outlined"
                    placeholder={`Size ${index + 1}`}
                    value={size.description}
                    onChange={(e) =>
                      handleSizeChange(index, "description", e.target.value)
                    }
                  />
                  <Button onClick={() => removeSizeField(index)}>
                    Xóa
                  </Button>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button onClick={addSizeField}>Thêm Size</Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleButton}>
            Thêm
          </Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
