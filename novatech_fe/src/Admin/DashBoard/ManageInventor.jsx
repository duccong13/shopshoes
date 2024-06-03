import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../State/Admin/Order/Action";
import { Grid, Tooltip } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// lấy tháng trong chuỗi string
function getMonthFromDate(dateString) {
  const dateObject = new Date(dateString);
  const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  return month;
}

function getYearFromDate(dateString) {
  const dateObject = new Date(dateString);
  const month = dateObject.getFullYear(); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  return month;
}

function isDateInRange(orderDate, rangeInDays) {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - rangeInDays);

  const order = new Date(orderDate);
  return order >= pastDate && order <= now;
}

const ManageInventor = () => {
  const { aorder } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [aorder.shipped, aorder.confirmed, aorder.delivered, aorder.deletedOrder, aorder.order]);
  
  // console.log("Danh sách sản phẩm", aorder);

  // Doanh thu 7 ngày
  const handle7DayRevenue =
    aorder.orders &&
    aorder.orders.result &&
    aorder.orders.result.filter((item) => isDateInRange(item.orderDate, 7));

  // Tạo một bảng mới để lưu tổng giá trị theo từng ngày
  let table = {};
  let currentDate = new Date();
  // Lặp qua 7 ngày trước
  for (let i = 6; i >= 0; i--) {
    let date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let dateString = `${year}-${month}-${day}`;
    // Tìm các đối tượng có cùng ngày trong mảng orders
    let ordersOnDate =
      handle7DayRevenue &&
      handle7DayRevenue.filter((order) =>
        order.orderDate.startsWith(dateString)
      );
    // Nếu không có đơn hàng cho ngày hiện tại, set totalPrice = 0
    if (ordersOnDate && ordersOnDate.length === 0) {
      table[dateString] = 0;
    } else {
      // Tính tổng giá trị của các đơn hàng trên ngày hiện tại
      let total =
        ordersOnDate &&
        ordersOnDate.reduce(
          (sum, order) => sum + order.totalDiscountedPrice,
          0
        );
      table[dateString] = total;
    }
  }
  var result = Object.keys(table).map(function (date) {
    return { orderDate: date, totalDiscountedPrice: table[date] };
  });

  // Doanh thu 7 ngày
  const totalPrice7Day =
    handle7DayRevenue &&
    handle7DayRevenue.reduce((acc, cur) => acc + cur.totalDiscountedPrice, 0);
  // Tong san pham 7 ngay
  const totalItem7Day =
    handle7DayRevenue &&
    handle7DayRevenue.reduce((acc, cur) => acc + cur.totalItems, 0);

  const data7Day = result && result.map((item) => item.totalDiscountedPrice);

  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Số tiền",
        data: data7Day,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          formatDate(Date.now() - 6 * 24 * 60 * 60 * 1000),
          formatDate(Date.now() - 5 * 24 * 60 * 60 * 1000),
          formatDate(Date.now() - 4 * 24 * 60 * 60 * 1000),
          formatDate(Date.now() - 3 * 24 * 60 * 60 * 1000),
          formatDate(Date.now() - 2 * 24 * 60 * 60 * 1000),
          formatDate(Date.now() - 1 * 24 * 60 * 60 * 1000),
          formatDate(Date.now()),
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  // Doanh thu ngày hôm nay
  const handleDayRevenue =
    aorder.orders &&
    aorder.orders.result &&
    aorder.orders.result.filter(
      (item) => formatDate(item.orderDate) === formatDate(new Date())
    );
  const totalPriceDate =
    handleDayRevenue &&
    handleDayRevenue.reduce((acc, cur) => acc + cur.totalDiscountedPrice, 0);
  const totalItemDate =
    handleDayRevenue &&
    handleDayRevenue.reduce((acc, cur) => acc + cur.totalItems, 0);

  const curDate = new Date();
  const curMonth = curDate.getMonth() + 1;
  const handleTotalPriceMonth =
    aorder.orders &&
    aorder.orders.result &&
    aorder.orders.result.filter(
      (item) => getMonthFromDate(item.orderDate) === curMonth
    );
  const totalPriceMonth =
    handleTotalPriceMonth &&
    handleTotalPriceMonth.reduce(
      (acc, cur) => acc + cur.totalDiscountedPrice,
      0
    );
  // Tong san pham 1 thang
  const totalItemMonth =
    handleTotalPriceMonth &&
    handleTotalPriceMonth.reduce((acc, cur) => acc + cur.totalItems, 0);

  // Đưa ra tổng sản phẩm, tổng tiền trong 1 năm
  // const curYear = curDate.getFullYear();
  // const handleTotalPriceYear =
  //   aorder.orders &&
  //   aorder.orders.result &&
  //   aorder.orders.result.filter(
  //     (item) => getYearFromDate(item.orderDate) === curYear
  //   );
  // const totalPriceYear =
  //   handleTotalPriceYear &&
  //   handleTotalPriceYear.reduce(
  //     (acc, cur) => acc + cur.totalDiscountedPrice,
  //     0
  //   );
  // // Tong san pham ca nam
  // const totalItemYear =
  //   handleTotalPriceYear &&
  //   handleTotalPriceYear.reduce((acc, cur) => acc + cur.totalItems, 0);

  //// Đưa ra top 5 sản phẩm được bán nhiều nhất
  // Tạo một object để lưu số lượng bán của mỗi sản phẩm
  const salesByProduct = {};

  aorder.orders &&
    aorder.orders.result &&
    aorder.orders.result.forEach((item) => {
      item.orderItems.forEach((secondItem) => {
        const productId = secondItem.product.productId;
        const quantity = secondItem.quantity;
        const price = secondItem.product.price; // Giá của sản phẩm
        const totalPrice = quantity * price; // Tổng số tiền từ sản phẩm

        if (!salesByProduct[productId]) {
          salesByProduct[productId] = {
            quantity: 0,
            totalPrice: 0,
            name: secondItem.product.name,
          };
        }

        salesByProduct[productId].quantity += quantity;
        salesByProduct[productId].totalPrice += totalPrice;
      });
    });

  // Sắp xếp sản phẩm theo số lượng bán
  const sortedProducts = Object.keys(salesByProduct).sort(
    (a, b) => salesByProduct[b].quantity - salesByProduct[a].quantity
  );
  const top5Product = sortedProducts.slice(0, 5).map((productId) => ({
    productId,
    name: salesByProduct[productId].name,
    totalPrice: salesByProduct[productId].totalPrice, // Thêm tổng số tiền vào mảng top5Product
    quantity: salesByProduct[productId].quantity,
  }));

  // top 5 người mua hàng nhiều nhất
  function findTop5Customers(orders) {
    // Tính tổng số lượng sản phẩm và tổng giá trị đơn hàng đã giảm giá của mỗi khách hàng
    const customerOrders = orders.reduce((acc, order) => {
      const userId = order.user.userId;
      if (!acc[userId]) {
        acc[userId] = {
          user: order.user,
          totalItems: 0,
          totalDiscountedPrice: 0
        };
      }
      acc[userId].totalItems += order.totalItems;
      acc[userId].totalDiscountedPrice += order.totalDiscountedPrice;
      return acc;
    }, {});
  
    // Chuyển đối tượng thành mảng và sắp xếp theo tổng số lượng sản phẩm giảm dần
    const sortedCustomers = Object.values(customerOrders).sort((a, b) => b.totalItems - a.totalItems);
  
    // Lấy 5 khách hàng đặt hàng nhiều nhất
    return sortedCustomers.slice(0, 5);
  }

  const top5Person = findTop5Customers(handleTotalPriceMonth);


  const chartConfig2 = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Số tiền",
        data: [
          top5Product[0].totalPrice,
          top5Product[1].totalPrice,
          top5Product[2].totalPrice,
          top5Product[3].totalPrice,
          top5Product[4].totalPrice,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0000ff"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "blue",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          top5Product[0].name.slice(0, 10),
          top5Product[1].name.slice(0, 10),
          top5Product[2].name.slice(0, 10),
          top5Product[3].name.slice(0, 10),
          top5Product[4].name.slice(0, 10),
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfig3 = {
    type: "pie",
    width: 240,
    height: 236,
    series: [
      top5Product[0].quantity,
      top5Product[1].quantity,
      top5Product[2].quantity,
      top5Product[3].quantity,
      top5Product[4].quantity,
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0800ff", "#413aff", "#706bff", "#a6a3ff", "#d7d6ff"],
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val, { seriesIndex }) {
            // Custom tooltip formatter here
            // Access product name from top5Product array using seriesIndex
            const productName = top5Product[seriesIndex].name.substring(0, 20); // Lấy 20 ký tự đầu
            // Return custom tooltip string
            return `${productName}, Số lượng: ${val}`;
          },
        },
      },
    },
  };

  const chartConfig4 = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Số tiền",
        data: [
          top5Person[0].totalDiscountedPrice,
          top5Person[1].totalDiscountedPrice,
          top5Person[2].totalDiscountedPrice,
          top5Person[3].totalDiscountedPrice,
          top5Person[4].totalDiscountedPrice,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ff0000"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "blue",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          ` Mã khách hàng ${top5Person[0].user.userId} `,
          ` Mã khách hàng ${top5Person[1].user.userId} `,
          ` Mã khách hàng ${top5Person[2].user.userId} `,
          ` Mã khách hàng ${top5Person[3].user.userId} `,
          ` Mã khách hàng ${top5Person[4].user.userId} `,
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const chartConfig5 = {
    type: "pie",
    width: 240,
    height: 236,
    series: [
      top5Person[0].totalItems,
      top5Person[1].totalItems,
      top5Person[2].totalItems,
      top5Person[3].totalItems,
      top5Person[4].totalItems,
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ff0000", "#ff4242", "#ff7070", "#ffa3a3", "#ffd1d1"],
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val, { seriesIndex }) {
            // Custom tooltip formatter here
            // Access product name from top5Product array using seriesIndex
            const email = top5Person[seriesIndex].user.email; // Lấy 20 ký tự đầu
            // Return custom tooltip string
            return `${email}, Số lượng mua: ${val}`;
          },
        },
      },
    },
  };

  const formatMoney = (data) => {
    return data && data.toLocaleString("vi-VN");
  };

  return (
    <div>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              variant="gradient"
              floated={false}
              shadow={false}
              className="place-items-center text-[#333]"
            >
              <TodayIcon />
              Doanh số bán hàng ngày hôm nay
            </CardHeader>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600 cursor-pointer"
              >
                <Tooltip title={"Số lượng sản phẩm"}>
                  {formatMoney(totalItemDate)}
                </Tooltip>
              </Typography>
              <Typography
                variant="body2"
                className="text-[#DD5746] cursor-pointer"
              >
                <Tooltip title={"Tổng tiền"}>
                  {formatMoney(totalPriceDate)} đ
                </Tooltip>
              </Typography>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              variant="gradient"
              floated={false}
              shadow={false}
              className="place-items-center text-[#333]"
            >
              <TodayIcon />
              Doanh số bán hàng 7 ngày gần nhất
            </CardHeader>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600 cursor-pointer"
              >
                <Tooltip title={"Số lượng sản phẩm"}>
                  {formatMoney(totalItem7Day)}
                </Tooltip>
              </Typography>
              <Typography
                variant="body2"
                className="text-[#DD5746] cursor-pointer"
              >
                <Tooltip title={"Tổng tiền"}>
                  {formatMoney(totalPrice7Day)} đ
                </Tooltip>
              </Typography>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              variant="gradient"
              floated={false}
              shadow={false}
              className="place-items-center text-[#333]"
            >
              <TodayIcon />
              Doanh số bán hàng tháng hiện tại
            </CardHeader>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600 cursor-pointer"
              >
                <Tooltip title={"Số lượng sản phẩm"}>
                  {formatMoney(totalItemMonth)}
                </Tooltip>
              </Typography>
              <Typography
                variant="body2"
                className="text-[#DD5746] cursor-pointer"
              >
                <Tooltip title={"Tổng tiền"}>
                  {formatMoney(totalPriceMonth)} đ
                </Tooltip>
              </Typography>
            </CardBody>
          </Card>
        </Grid>
        {/* <Grid item xs={3}>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              variant="gradient"
              floated={false}
              shadow={false}
              className="place-items-center text-[#333]"
            >
              <TodayIcon />
              Doanh số bán hàng cả năm của cửa hàng
            </CardHeader>
            <CardBody className="p-4 text-right">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600 cursor-pointer"
              >
                <Tooltip title={"Số lượng sản phẩm"}>
                  {formatMoney(totalItemYear)}
                </Tooltip>
              </Typography>
              <Typography
                variant="body2"
                className="text-[#DD5746] cursor-pointer"
              >
                <Tooltip title={"Tổng tiền"}>
                  {formatMoney(totalPriceYear)} đ
                </Tooltip>
              </Typography>
            </CardBody>
          </Card>
        </Grid> */}
        <Grid item xs={8}>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Biểu đồ
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Doanh số bán hàng trong 7 ngày trở lại đây
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Biểu đồ
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Top 5 sản phẩm bán chạy nhất
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig2} />
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Top 5 bán chạy
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Số lượng sản phẩm
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig3} />
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Khách hàng tiêu biểu
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Top 5 khách hàng chi nhiều nhất tháng hiện tại
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
              <Chart {...chartConfig4} />
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Top 5 người mua hàng nhiều nhất
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Số lượng sản phẩm
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig5} />
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageInventor;
