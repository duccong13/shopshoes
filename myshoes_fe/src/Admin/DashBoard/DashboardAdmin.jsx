import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidenav from "./SideNav.jsx";
import DashboardNavbar from "./DashBoard-nav.jsx";
import Configurator from "./Configurator.jsx";
import { setOpenConfigurator, useMaterialTailwindController } from "../Context/index.jsx";
import routes from "../Routers/routers.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import ManageProduct from "./ManageProduct.jsx";
import ManageOrder from "./ManageOrder.jsx";
import ManageInventor from "./ManageInventor.jsx";
import { ManageUser } from "./ManageUser.jsx";
import MessageAdmin from "./MessageAdmin.jsx";

export function DashboardAdmin() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        {/* <Home/> */}
        {/* <ManageOrder/> */}
        {/* <ManageProduct/> */}
        {/* <ManageUser/> */}
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ManageProduct/>}/>
          <Route path="/orders" element={<ManageOrder/>}/>
          <Route path="/users" element={<ManageUser/>}/>
          <Route path="/inventor" element={<ManageInventor/>}/>
          <Route path="/messages" element={<MessageAdmin/>}/>
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

export default DashboardAdmin;
