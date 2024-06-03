import React from "react";
import statisticsCardsData from "../Data/statistics-cards";
import StatisticsCard from "../Widgets/Cards/StatisticsCard";
import statisticsChartsData from "../Data/statistics-charts";
import StatisticsChart from "../Widgets/Charts/StatisticsChart";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Typography } from "@material-tailwind/react";
// import { CardBody, IconButton, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
// import { ArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <AccessTimeIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-blue-gray-400"
                />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
