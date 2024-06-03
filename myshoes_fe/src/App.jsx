import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRouters from "./Router/AdminRouters";
import UserRouters from "./Router/UserRouters";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRouters />}></Route>
        <Route path="/*" element={<UserRouters />}></Route>
      </Routes>
      {/* <Home/> */}
      {/* <HomePage /> */}
      {/* <SignIn/> */}
      {/* <SignUp/> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
