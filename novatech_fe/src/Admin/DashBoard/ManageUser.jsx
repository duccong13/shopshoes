import React, { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { Avatar, Button, Tooltip } from "@mui/material";
import userTable from "../Data/userTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../State/Auth/Action";
import { deleteUser } from "../../State/Admin/User/Action";

export const ManageUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useSelector((store) => store);
  // console.log(auth)
  useEffect(() => {
    dispatch(getAllUser());
  }, []);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const online = true;

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="mt-5">
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Danh sách khách hàng
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Id",
                    "Ảnh đại diện",
                    "Họ Tên",
                    "Email",
                    "Ngày Sinh",
                    "Trạng Thái",
                    "Quyền truy cập",
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
                {auth.users &&
                  auth.users.data &&
                  auth.users.data.result
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, key) => {
                      const className = `py-3 px-5 ${
                        key === item.length
                          ? ""
                          : "border-b border-blue-gray-50 text-center"
                      }`;

                      return (
                        <tr key={item.userId || ""}>
                          <td className={className}>
                            <Typography className="text-sm text-[#333]">
                              {item.userId || ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Tooltip>
                              <Avatar
                                src={
                                  item.avatarUrl ||
                                  "https://avatar.iran.liara.run/public/21"
                                }
                                alt={key}
                                size="xs"
                                className={`cursor-pointer border-2 border-white
                              }`}
                              />
                            </Tooltip>
                          </td>
                          <td className={className}>
                            <Typography className="text-sm text-[#333]">
                              {item.lastName || ""} {item.firstName || ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-sm text-[#333]">
                              {item.email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-sm text-[#333]">
                              {item.dob || ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={item.online ? "green" : "red"}
                              value={item.online ? "online" : "offline"}
                              className="font-medium"
                            />
                          </td>
                          <td className={className}>
                            {item.roles.map((role) => (
                              <Typography className="text-sm text-[#333]">
                                {role.name}
                              </Typography>
                            ))}
                          </td>
                          <td className={className}>
                            <Button
                              variant="text"
                              startIcon={<DeleteIcon />}
                              sx={{ color: "red" }}
                              onClick={() => handleDeleteUser(item.userId)}
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
                auth.users && auth.users.data && auth.users.data.result.length
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
    </div>
  );
};
