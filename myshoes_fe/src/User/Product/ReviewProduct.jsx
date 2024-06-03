import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Pagination,
  Rating,
  TablePagination,
} from "@mui/material";
import { Textarea } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewByProduct,
  deleteReviewByProduct,
  getReviewByProduct,
  updateReviewByProduct,
} from "../../State/User/Review/Action";

function getDateFromISO(isoString) {
  const date = isoString.split("T")[0];
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

const ReviewProduct = ({ productId, reviews }) => {
  const { auth } = useSelector((store) => store);

  const userId = auth.user && auth.user.result.userId;
  console.log(userId);
  const dispatch = useDispatch();
  const { review } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log("Reviews", reviews);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleButtonReview = () => {
    dispatch(createReviewByProduct(productData));
    handleClose();
  };

  const [productData, setProductData] = useState({
    productId: productId,
    content: "",
    imageUrl: "",
    rating: 0,
  });

  const [updateData, setUpdateData] = useState({
    content: "",
    imageUrl: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageUrl") {
      const file = files[0];
      setProductData((prev) => ({
        ...prev,
        [name]: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageUrl") {
      const file = files[0];
      setUpdateData((prev) => ({
        ...prev,
        [name]: file ? URL.createObjectURL(file) : "",
      }));
    } else {
      setUpdateData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRatingChange = (event, newValue) => {
    setProductData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleRatingUpdate = (event, newValue) => {
    setUpdateData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  // useEffect(() => {
  //   dispatch(getReviewByProduct(productId));
  // }, [review.review, review.deleteReviews, review.updateReviews]);

  const handleRating = (data) => {
    const handleAvgReview =
      data && data.reduce((arr, cur) => arr + cur.rating, 0);
    const totalReview = data && data.length;
    return Math.round((handleAvgReview / totalReview) * 10) / 10;
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewByProduct(reviewId));
  };

  const handleUpdateReview = (reviewId, content) => {
    dispatch(updateReviewByProduct({ reviewId: reviewId, content: content }));
    handleClose1();
  };

  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingStar = (rating) => {
    setSelectedRating(rating);
  };

  const filteredReviews = selectedRating
    ? selectedRating === 0
      ? reviews
      : reviews.filter((item) => item.rating === selectedRating)
    : reviews;

  // console.log("SS",filteredReviews)

  return (
    <>
      <Grid container className="mt-5">
        <Grid item container xs={7} spacing={2} className="shadow-md p-5">
          <Grid
            item
            xs={4}
            container
            justifyContent={"center"}
            alignContent={"center"}
          >
            <p className="font-semibold text-xl text-black">
              {handleRating(reviews)}/5
            </p>
            <Rating value={5} defaultValue={5}></Rating>
            <p>Số lượt đánh giá: {reviews && reviews.length}</p>
          </Grid>
          <Grid item xs={8}>
            <Box className="mt-5 space-y-3">
              {/* 1 */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <p>5⭐</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={40}
                    color="success"
                  />
                </Grid>
                <Grid item xs={3}>
                  <p className="ml-3">
                    {reviews
                      ? reviews.filter((item) => item.rating === 5).length
                      : 0}
                    đánh giá
                  </p>
                </Grid>
              </Grid>

              {/* 2 */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <p>4⭐</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={30}
                    color="success"
                  />
                </Grid>
                <Grid item xs={3}>
                  <p className="ml-3">
                    {reviews
                      ? reviews.filter((item) => item.rating === 4).length
                      : 0}
                    đánh giá
                  </p>
                </Grid>
              </Grid>

              {/* 3 */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <p>3⭐</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={25}
                  />
                </Grid>
                <Grid item xs={3}>
                  <p className="ml-3">
                    {reviews
                      ? reviews.filter((item) => item.rating === 3).length
                      : 0}
                    đánh giá
                  </p>
                </Grid>
              </Grid>

              {/* 4 */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <p>2⭐</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={20}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={3}>
                  <p className="ml-3">
                    {reviews
                      ? reviews.filter((item) => item.rating === 2).length
                      : 0}
                    đánh giá
                  </p>
                </Grid>
              </Grid>

              {/* 5 */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <p>1⭐</p>
                </Grid>
                <Grid item xs={7}>
                  <LinearProgress
                    sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                    variant="determinate"
                    value={10}
                    color="error"
                  />
                </Grid>
                <Grid item xs={3}>
                  <p className="ml-3">
                    {reviews
                      ? reviews.filter((item) => item.rating === 1).length
                      : 0}
                    đánh giá
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent={"center"}>
            <p>Bạn đánh giá sao về sản phẩm này?</p>
          </Grid>
          <Grid item xs={12} container justifyContent={"center"}>
            <Button variant="contained" onClick={handleClickOpen}>
              Đánh giá ngay
            </Button>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              "Đánh giá sản phẩm
            </DialogTitle>
            <DialogContent className="p-5">
              <div className="flex justify-between items-center">
                <label>Xếp hạng</label>
                <Rating
                  value={productData.rating}
                  name="rating"
                  onChange={handleRatingChange}
                />
              </div>
              <CssBaseline />
              <div className="w-full">
                <label>Nội dung đánh giá</label>
                <Textarea
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Viết cái gì đó ..."
                  name="content"
                  value={productData.content}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="imageUrl"
                  id=""
                  onChange={handleChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleButtonReview}>Đánh giá</Button>
              <Button onClick={handleClose}>Thoái</Button>
            </DialogActions>
          </Dialog>
          <Grid item xs={12}>
            <p className="text-xl text-black py-5 font-bold">Lọc theo</p>
            <div className="flex gap-5">
              <Button variant="outlined" onClick={() => handleRatingStar(5)}>
                5⭐
              </Button>
              <Button variant="outlined" onClick={() => handleRatingStar(4)}>
                4⭐
              </Button>
              <Button variant="outlined" onClick={() => handleRatingStar(3)}>
                3⭐
              </Button>
              <Button variant="outlined" onClick={() => handleRatingStar(2)}>
                2⭐
              </Button>
              <Button variant="outlined" onClick={() => handleRatingStar(1)}>
                1⭐
              </Button>
              <Button variant="outlined" onClick={() => handleRatingStar(0)}>
                ALL⭐
              </Button>
            </div>
            <hr className="mt-2" />
          </Grid>
          <Grid item xs={12} container spacing={5}>
            {filteredReviews &&
              filteredReviews
                .sort((a, b) => b.reviewId - a.reviewId)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) =>
                  item.user.userId === userId ? (
                    <Grid item container xs={12}>
                      <Grid item xs={1}>
                        <Avatar
                          src={
                            item.user.avatarUrl ||
                            "https://avatar.iran.liara.run/public/10"
                          }
                        ></Avatar>
                      </Grid>
                      <Grid item xs={8}>
                        <p className="text-black">
                          <b>
                            {item.user?.firstName && item.user?.lastName
                              ? `${item.user?.firstName} ${item.user?.lastName}`
                              : "Ẩn danh"}
                          </b>{" "}
                          ⏱{getDateFromISO(item.createAt)}
                        </p>
                        <Rating defaultValue={5} value={item.rating}></Rating>
                        <p>{item.content}</p>
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="text" onClick={handleClickOpen1}>
                          Chỉnh sửa
                        </Button>
                        <Dialog
                          open={open1}
                          onClose={handleClose1}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            "Đánh giá sản phẩm
                          </DialogTitle>
                          <DialogContent className="p-5">
                            <div className="flex justify-between items-center">
                              <label>Xếp hạng</label>
                              <Rating
                                value={updateData.rating}
                                name="rating"
                                onChange={handleRatingUpdate}
                              />
                            </div>
                            <CssBaseline />
                            <div className="w-full">
                              <label>Nội dung đánh giá</label>
                              <Textarea
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Viết cái gì đó ..."
                                name="content"
                                value={updateData.content}
                                onChange={handleUpdate}
                              />
                              <input
                                type="file"
                                name="imageUrl"
                                id=""
                                onChange={handleUpdate}
                              />
                            </div>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() =>
                                handleUpdateReview(item?.reviewId, updateData)
                              }
                            >
                              Cập nhật
                            </Button>
                            <Button onClick={handleClose1}>Thoái</Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          onClick={() => handleDeleteReview(item?.reviewId)}
                        >
                          Xóa
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <hr />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item container xs={12}>
                      <Grid item xs={1}>
                        <Avatar
                          src={
                            item.user.avatarUrl ||
                            "https://avatar.iran.liara.run/public/10"
                          }
                        ></Avatar>
                      </Grid>
                      <Grid item xs={8}>
                        <p className="text-black">
                          <b>
                            {item.user?.firstName && item.user?.lastName
                              ? `${item.user?.firstName} ${item.user?.lastName}`
                              : "Ẩn danh"}
                          </b>{" "}
                          ⏱{getDateFromISO(item.createAt)}
                        </p>
                        <Rating defaultValue={5} value={item.rating}></Rating>
                        <p>{item.content}</p>
                      </Grid>
                      {/* <Grid item xs={2}>
                        <Button variant="text" onClick={handleClickOpen1}>
                          Chỉnh sửa
                        </Button>
                        <Dialog
                          open={open1}
                          onClose={handleClose1}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            "Đánh giá sản phẩm
                          </DialogTitle>
                          <DialogContent className="p-5">
                            <div className="flex justify-between items-center">
                              <label>Xếp hạng</label>
                              <Rating
                                value={updateData.rating}
                                name="rating"
                                onChange={handleRatingUpdate}
                              />
                            </div>
                            <CssBaseline />
                            <div className="w-full">
                              <label>Nội dung đánh giá</label>
                              <Textarea
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Viết cái gì đó ..."
                                name="content"
                                value={updateData.content}
                                onChange={handleUpdate}
                              />
                              <input
                                type="file"
                                name="imageUrl"
                                id=""
                                onChange={handleUpdate}
                              />
                            </div>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() =>
                                handleUpdateReview(item?.reviewId, updateData)
                              }
                            >
                              Cập nhật
                            </Button>
                            <Button onClick={handleClose1}>Thoái</Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          onClick={() => handleDeleteReview(item?.reviewId)}
                        >
                          Xóa
                        </Button>
                      </Grid> */}
                      <Grid item xs={12}>
                        <hr />
                      </Grid>
                    </Grid>
                  )
                )}
          </Grid>
          <Grid item container xs={12} justifyContent={"center"}>
            <TablePagination
              rowsPerPageOptions={[3, 6, 10]}
              component="div"
              count={reviews && reviews.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Hàng trên mỗi trang"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewProduct;
