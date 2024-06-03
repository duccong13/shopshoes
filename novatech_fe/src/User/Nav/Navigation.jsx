import React, { useEffect, useState } from "react";
import { Navbar, Button } from "@material-tailwind/react";

import InputBase from "@mui/material/InputBase";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SmartphoneSharpIcon from "@mui/icons-material/SmartphoneSharp";
import LaptopChromebookSharpIcon from "@mui/icons-material/LaptopChromebookSharp";
import TabletMacSharpIcon from "@mui/icons-material/TabletMacSharp";
import WatchSharpIcon from "@mui/icons-material/WatchSharp";
import HeadsetSharpIcon from "@mui/icons-material/HeadsetSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import "./nav.css";
import { deepPurple } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUser, logout, updateStatus } from "../../State/Auth/Action";
import { getCart } from "../../State/User/Cart/Action";
import {
  findProductByName,
  findProductsById,
  findProduts,
  getProducts,
} from "../../State/User/Product/Action";

const dataCategory = [
  {
    firstCategory: "Men shoes",
    firstContent: [
      {
        secondCategory: "Sport shoes",
        secondContent: [
          "Nike",
          "Adidas",
          "Puma",
          "Converse",
          "Skechers",
          "Rebook",
          "Vans",
        ],
      },
      {
        secondCategory: "Western shoes",
        secondContent: [
          "Salvatore Ferragamo",
          "Giorgio Armani",
          "Minichino",
          "Massimo dutti",
        ],
      },
      {
        secondCategory: "Leather shoes",
        secondContent: ["Gucci", "Ecco", "CNES", "Ecco"],
      },
    ],
  },
  {
    firstCategory: "Women Shoes",
    firstContent: [
      {
        secondCategory: "High heels",
        secondContent: [
          "Charles Keith",
          "Dior",
          "Louis Vuitton",
          "Alexander McQueen",
          "Gucci",
          "Christian Louboutin",
          "Manolo Blahnik",
        ],
      },
      {
        secondCategory: "Sport shoes",
        secondContent: [
          "Nike",
          "Adidas",
          "Puma",
          "Converse",
          "Skechers",
          "Rebook",
          "Vans",
        ],
      },
      {
        secondCategory: "Boot",
        secondContent: ["Timberland", "UGG", "Hunter", "Dr. Martens", "Steve Madden", "Frye"],
      },
    ],
  },
  // {
  //   firstCategory: "HeadPhone",
  //   firstContent: [
  //     {
  //       secondCategory: "Bluetooth",
  //       secondContent: ["Apple", "Sony", "Marshall", "SoundPEATS"],
  //     },
  //     {
  //       secondCategory: "Chụp tai",
  //       secondContent: ["Apple", "Sony", "Marshall", "SoundPEATS"],
  //     },
  //     {
  //       secondCategory: "Nhét tai",
  //       secondContent: ["Apple", "Sony", "Marshall", "SoundPEATS"],
  //     },
  //     {
  //       secondCategory: "Có dây",
  //       secondContent: ["Apple", "Sony", "Marshall", "SoundPEATS"],
  //     },
  //   ],
  // },
  // {
  //   firstCategory: "Watch",
  //   firstContent: [
  //     {
  //       secondCategory: "Apple Watch",
  //       secondContent: [
  //         "APPLE WATCH SERIES 9",
  //         "APPLE WATCH SERIES 8",
  //         "APPLE WATCH SERIES 7",
  //         "APPLE WATCH ULTRA",
  //         "APPLE WATCH SE",
  //         "APPLE WATCH ULTRA 2",
  //       ],
  //     },
  //     {
  //       secondCategory: "Gramin",
  //       secondContent: ["EPIX", "INSTINCT", "FENIX", "APPROACH", "VENU"],
  //     },
  //     {
  //       secondCategory: "Xiaomi",
  //       secondContent: ["GTS", "CHEETAH", "FORERUNNER", "GTR"],
  //     },
  //     {
  //       secondCategory: "Hãng khác",
  //       secondContent: ["SamSung", "XiaoMi", "Huawei"],
  //     },
  //   ],
  // },
];

const Search = styled("div")(({ theme }) => ({
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: "white",
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

function NavItem({ label }) {
  return (
    <a href="#">
      <Typography as="li" color="blue-gray" className="font-normal">
        {label}
      </Typography>
    </a>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <div className="flex items-center hover:backdrop-blur-md p-1">
        <SmartphoneSharpIcon />
        <NavItem label="Điện Thoại" />
        <ArrowDropDownIcon />
      </div>
      <div className="flex items-center hover:backdrop-blur-md p-1">
        <LaptopChromebookSharpIcon />
        <NavItem label="Laptop" />
        <ArrowDropDownIcon />
      </div>
      <div className="flex items-center hover:backdrop-blur-md p-1">
        <TabletMacSharpIcon />
        <NavItem label="Tablet" />
        <ArrowDropDownIcon />
      </div>
      <div className="flex items-center hover:backdrop-blur-md p-1">
        <WatchSharpIcon />
        <NavItem label="Đồng Hồ" />
        <ArrowDropDownIcon />
      </div>
      <div className="flex items-center hover:backdrop-blur-md p-1">
        <HeadsetSharpIcon />
        <NavItem label="Phụ Kiện" />
        <ArrowDropDownIcon />
      </div>
    </ul>
  );
}

export function Navigation({ setLoading }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const { auth } = useSelector((store) => store);
  // console.log(auth)
  const { cart } = useSelector((store) => store);
  const { uproduct } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOne = (firstItem) => {
    navigate(`/${firstItem}`);
    setIsDropdown(false);
  };

  const handleTwo = (secondItem) => {
    navigate(`/${secondItem}`);
    setIsDropdown(false);
  };

  const handleThree = (thirdItem) => {
    navigate(`/${thirdItem}`);
    setIsDropdown(false);
  };

  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatar = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(updateStatus());
    handleCloseMenu();
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
    }, 2000);
  };
  // Hàm kiểm tra và xóa localStorage sau 4 giờ
  function clearLocalStorageAfter4Hours() {
    const now = new Date().getTime();
    const storedTime = localStorage.getItem("startTime");

    if (storedTime) {
      const elapsedTime = now - storedTime;
      const fourHours = 4 * 60 * 60 * 1000;

      if (elapsedTime > fourHours) {
        dispatch(updateStatus());
        localStorage.clear();
        localStorage.setItem("startTime", now);
      }
    } else {
      localStorage.setItem("startTime", now);
    }
  }
  clearLocalStorageAfter4Hours();
  // localStorage.clear();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart());
    }
  }, [jwt]);

  const [data, setData] = useState({
    search: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [productData, setProductData] = useState({
    pageNumber: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const reqData = {
      request: data.search,
    };
    dispatch(findProductByName(reqData));
    dispatch(getProducts(productData));
  }, [data]);

  const handleProduct = (productId) => {
    setData((prev) => ({
      ...prev,
      search: "",
    }));
    navigate(`/product/${productId}`);
  };

  //dinh dang tien
  const formatMoney = (data) => {
    return data.toLocaleString("vi-VN");
  };

  return (
    <Navbar fullWidth className="p-2 fixed top-0 right-0 z-10">
      <div className="container flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="http://localhost:5173"
          color="blue-gray"
          className="mr-4 cursor-pointer text-lg font-bold"
          variant="h4"
        >
          <Tooltip title="Về trang chủ">MyShoes</Tooltip>
        </Typography>
        {/* <div className="hidden lg:block">
          <NavList />
        </div> */}
        <div className="dropdown">
          <Button
            className="flex items-center p-2 justify-between bg-white text-black"
            onClick={toggleDropdown}
          >
            <CategorySharpIcon />
            <Typography variant="body2">Danh Mục</Typography>
            <ArrowDropDownIcon />
          </Button>
          {isDropdown && (
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow rounded-box w-52 mt-2 cursor-pointer bg-[#333] gap-0"
            >
              {dataCategory.map((item) => (
                <li className="p-2 pr-0" key={item}>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <Typography onClick={() => handleOne(item.firstCategory)}>
                      {item.firstCategory}
                    </Typography>
                    <ArrowRightSharpIcon />
                  </Box>
                  <div className="absolute left-[95%] bg-transparent hover:bg-transparent w-[10px] h-[60%]"></div>
                  <ul className="absolute left-full top-0 p-3 shadow cursor-pointer bg-[#333] w-44">
                    {item.firstContent.map((secondItem) => (
                      <li className="flex justify-between">
                        <Box>
                          <Typography
                            onClick={() => handleTwo(secondItem.secondCategory)}
                            className="text-white"
                            variant="caption text"
                          >
                            {secondItem.secondCategory}
                          </Typography>
                          <ArrowRightSharpIcon className="text-white" />
                        </Box>
                        <div className="absolute left-[95%] before:content-none hover:bg-transparent w-[10px] h-full"></div>
                        <ul className="absolute left-[100%] border-0 border-transparent bg-[#333] rounded-lg">
                          {secondItem.secondContent.map((thirdItem) => (
                            <li className="drop-third w-60 py-1 px-4 m-0">
                              <Typography
                                onClick={() => handleThree(thirdItem)}
                                variant="caption text"
                                className="text-white border-0 border-transparent"
                              >
                                {thirdItem}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ zIndex: 10 }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            className="relative rounded-lg"
            name="search"
            onChange={handleChange}
            value={data.search}
            onClose={handleCloseMenu}
          />
          {data.search && data.search.trim() !== "" && (
            <div className="w-[130%] p-2 bg-white absolute top-14 border-2 border-gray-500 rounded-lg">
              <p className="opacity-80 m-2">Sản phẩm gợi ý</p>
              {uproduct.searchproducts.result.length !== 0 ? (
                uproduct.searchproducts.result
                  .filter((item) => item.quantity > 0)
                  .slice(0, 3)
                  .map((item) => (
                    <Grid
                      container
                      padding={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      mt={"2px"}
                      key={item.productId} // Thêm key để tránh cảnh báo React
                      className="hover:bg-[#e2e8f0] cursor-pointer"
                      onClick={() => handleProduct(item.productId)}
                    >
                      <Grid item xs={3}>
                        <Avatar
                          variant="rounded"
                          src={item.images[0].imageUrl} // Sử dụng URL ảnh thực tế của sản phẩm
                        ></Avatar>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="caption">
                          <span className="line-clamp-1">{item.name}</span>
                        </Typography>
                        <Typography variant="body2">
                          <span className="text-[#DD5746] mr-5">
                            {formatMoney(item.discountedPrice)}đ
                          </span>
                          <span className="text-[#333] line-through">
                            {formatMoney(item.price)}đ
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
              ) : (
                <p className="text-[#DD5746]">
                  Hiện tại không có sản phẩm 😢 😢 😢
                </p>
              )}
            </div>
          )}
        </Search>

        <div className="flex items-center gap-2">
          <LocalPhoneSharpIcon />
          <Box>
            <Typography variant="subtitle2">HotLine</Typography>
            <Typography variant="body2">0369371693</Typography>
          </Box>
        </div>

        <div className="flex justify-between items-center">
          <Box sx={{ textAlign: "center" }}>
            <Badge badgeContent={9} color="error">
              <NotificationsSharpIcon />
            </Badge>
            <Typography variant="body2">Thông Báo</Typography>
          </Box>
          <Box
            sx={{ textAlign: "center", marginX: "16px", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={
                cart.cart &&
                cart.cart.result &&
                cart.cart.result.cartItems.length
              }
              color="error"
            >
              <ShoppingCartSharpIcon />
            </Badge>
            <Typography variant="body2">Giỏ Hàng</Typography>
          </Box>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-white flex justify-between hover:bg-white p-2 border-none"
            >
              <img
                className="w-8 h-6"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                alt=""
              />
              <span>
                <ArrowDropDownIcon />
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow rounded-box w-24 bg-white p-0"
            >
              <li className="inline-block">
                <Box sx={{ display: "flex" }}>
                  <img
                    className="w-[65%] object-cover object-left-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                    alt=""
                  />
                  <Typography variant="body2">VN</Typography>
                </Box>
              </li>
              <li>
                <Box sx={{ display: "flex" }}>
                  <img
                    className="w-[65%] object-cover object-left-top"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <Typography variant="body2">EU</Typography>
                </Box>
              </li>
            </ul>
          </div>
        </div>
        {auth.user ? (
          <div>
            <Avatar
              color="gray"
              className="hidden lg:inline-block"
              aria-controls={openAvatar ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAvatar ? "true" : undefined}
              onClick={handleOpenMenu}
              sx={{
                bgcolor: deepPurple[500],
                color: "white",
                cursor: "pointer",
              }}
            >
              {auth.user &&
                auth.user.result &&
                auth.user.result.email[0].toUpperCase()}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              id="basic-menu"
              open={openAvatar}
              onClose={handleCloseMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate("/user")}>
                <Avatar /> Hồ sơ cá nhân
              </MenuItem>
              <MenuItem onClick={() => navigate("/order")}>
                <Avatar /> Xem đơn hàng
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng Xuất
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant="text"
            onClick={() => navigate("/auth/signin")}
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Signin
          </Button>
        )}
      </div>
    </Navbar>
  );
}

export default Navigation;
