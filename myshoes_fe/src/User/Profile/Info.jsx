import { Button, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../State/User/Profile/Action";
import { getUser, updateProfile } from "../../State/Auth/Action";
import { toast } from "react-toastify";

export const Info = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [firstName, setFirstName] = useState(true);
  const jwt = localStorage.getItem("jwt");

  // console.log("Auth", auth)

  useEffect(() => {
    dispatch(getUser(jwt));
  }, [jwt])

  const handleFirstName = () => {
    setFirstName(false);
  };
  const [lastName, setLastName] = useState(true);

  const handleLastName = () => {
    setLastName(false);
  };
  const [dob, setDob] = useState(true);

  const handleDob = () => {
    setDob(false);
  };

  const [phone, setPhone] = useState(true);

  const handlePhone = () => {
    setPhone(false);
  };

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    avatarUrl: '',
    dob: '',
    phone: ''
  });

  useEffect(() => {
    if (auth.user && auth.user.result) {
      setData({
        firstName: auth.user.result.firstName || '',
        lastName: auth.user.result.lastName || '',
        avatarUrl: auth.user.result.avatarUrl || '',
        dob: auth.user.result.dob || '',
        phone: auth.user.result.phone || ''
      });
    }
  }, [auth.user]);

  console.log("Data", data)
  console.log("Auth", auth)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(data));
    setFirstName(true);
    setLastName(true);
    setDob(true);
    setPhone(true);
  };
  // console.log("Data", data)

  const fileInputRef = React.createRef();
  return (
    <div>
      <div className="w-full min-h-screen md:w-2/3 lg:w-3/4">
        <div className="">
          <div className="w-full px-6 sm:max-w-xl sm:rounded-lg">
            <Typography variant="h4" className="font-bold sm:text-xl text-black">
            👽 Thông tin cá nhân
            </Typography>

            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-30 h-30 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={
                    (auth.user &&
                      auth.user.result.imageUrl) ||
                    "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/wysiwyg/Shipper_CPS3_1.png"
                  }
                />

                <div className="sm:ml-8">
                  <Input
                    type="file"
                    inputRef={fileInputRef}
                    style={{ display: "none" }}
                    className="hidden"
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    onClick={() => fileInputRef.current.click()}
                    sx={{ color: "#000" }}
                  >
                    Sửa
                  </Button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#000]">
                <div className="relative mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <TextField
                    label={"Họ Đệm"}
                    value={`${
                      data.lastName
                    }`}
                    //defaultValue="Linh"
                    variant="standard"
                    disabled={lastName}
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' },  // Thay đổi màu của đoạn text
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                      '& .MuiInput-input': {
                        color: 'black',  // Thay đổi màu của giá trị mặc định và đoạn text
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',  // Thay đổi màu của label
                      },
                      '& .Mui-disabled': {
                        color: 'red',  // Đổi màu của đoạn text khi bị vô hiệu hóa
                        WebkitTextFillColor: 'red',  // Đổi màu của giá trị mặc định khi bị vô hiệu hóa (trình duyệt Webkit)
                      },
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={handleLastName}
                    style={{
                      position: "absolute",
                      top: 15,
                      textDecoration: "underline",
                    }}
                  >
                    Thiết lập ngay
                  </Button>
                </div>
                <div className="relative mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <TextField
                    label={"Tên"}
                    value={`${
                      data.firstName
                    }`}
                    //defaultValue="Linh"
                    variant="standard"
                    disabled={firstName}
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' },  // Thay đổi màu của đoạn text
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                      '& .MuiInput-input': {
                        color: 'black',  // Thay đổi màu của giá trị mặc định và đoạn text
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',  // Thay đổi màu của label
                      },
                      '& .Mui-disabled': {
                        color: 'red',  // Đổi màu của đoạn text khi bị vô hiệu hóa
                        WebkitTextFillColor: 'red',  // Đổi màu của giá trị mặc định khi bị vô hiệu hóa (trình duyệt Webkit)
                      },
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={handleFirstName}
                    style={{
                      position: "absolute",
                      top: 15,
                      textDecoration: "underline",
                    }}
                  >
                    Thiết lập ngay
                  </Button>
                </div>

                <div className="relative mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <TextField
                    id="dob"
                    label={"Ngày sinh"}
                    value={`${
                      data.dob
                    }`}
                    //defaultValue={'14/06/2002'}
                    variant="standard"
                    disabled={dob}
                    name="dob"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' },  // Thay đổi màu của đoạn text
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                      '& .MuiInput-input': {
                        color: 'black',  // Thay đổi màu của giá trị mặc định và đoạn text
                      },
                      '& .Mui-disabled': {
                        color: 'red',  // Đổi màu của đoạn text khi bị vô hiệu hóa
                        WebkitTextFillColor: 'red',  // Đổi màu của giá trị mặc định khi bị vô hiệu hóa (trình duyệt Webkit)
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',  // Thay đổi màu của label
                      },
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={handleDob}
                    style={{
                      position: "absolute",
                      top: 15,
                      textDecoration: "underline",
                    }}
                  >
                    Thiết lập ngay
                  </Button>
                  <p className="p-2 text-[#E6FF94]">Đinh dạng ngày YYYY-MM-DD</p>
                </div>
                <div className="relative mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <TextField
                    disabled={phone}
                    id="phone"
                    name="phone"
                    label={"Số điện thoại"}
                    value={`${
                      data.phone
                    }`}
                    //defaultValue={"0869526280"}
                    variant="standard"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' },  // Thay đổi màu của đoạn text
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                      '& .MuiInput-input': {
                        color: 'black',  // Thay đổi màu của giá trị mặc định và đoạn text
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',  // Thay đổi màu của label
                      },
                      '& .Mui-disabled': {
                        color: 'red',  // Đổi màu của đoạn text khi bị vô hiệu hóa
                        WebkitTextFillColor: 'red',  // Đổi màu của giá trị mặc định khi bị vô hiệu hóa (trình duyệt Webkit)
                      },
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={handlePhone}
                    style={{
                      position: "absolute",
                      top: 15,
                      textDecoration: "underline",
                    }}
                  >
                    Thiết lập ngay
                  </Button>
                </div>
                <div className="mb-2 sm:mb-6">
                  <TextField
                    id="email"
                    label="Email"
                    value={`${
                      auth.user && auth.user.result.email
                    }`}
                    //defaultValue={"nvanlinh1406@gmail.com"}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: { color: 'red' },  // Thay đổi màu của đoạn text
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: 'red' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                    }}
                  />
                </div>
                <div className="relative mb-2 sm:mb-6">
                  <TextField
                    id="address"
                    label="Địa chỉ"
                    defaultValue="Lưu Đồn, Hồng Dũng, Thái Thụy, Thái Bình"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: { color: 'red' },  // Thay đổi màu của đoạn text
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: { color: 'red' },  // Thay đổi màu của label
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân trước khi focus
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân khi hover
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',  // Đổi màu gạch chân sau khi focus
                      },
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    onClick={handleSubmit}
                  >
                    Cập nhật thông tin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
