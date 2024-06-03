// import React from 'react'

// const HomePage = () => {
//   return (
//     <div className='text-green-500'>HomePage</div>
//   )
// }

// export default HomePage

import React from "react";
import Footer from "./Footer";
import Contact from "./Contact";
import Navigation from "../Nav/Navigation";
import MainCarosel from "./MainCarosel";
import HomeSectionCarosel from "./HomeSectionCarosel";
import ProductCard from "../Product/ProductCard";
import FilterProduct from "../Product/FilterProduct";
import DetailsProduct from "../Product/DetailsProduct";
import Cart from "../Cart/Cart";
import AddressOrder from "../Order/AddressOrder";
import PaymentOrder from "../Order/PaymentOrder";
import Profile from "../Profile/Profile";
import Order from "../Order/Order";

export function HomePage() {
  return (
    <>
      {/* <Navigation /> */}
      <div className="mt-[74px]">
        {/* <Profile /> */}
        {/* <FilterProduct/> */}
        {/* <Cart/> */}
        {/* <DetailsProduct/> */}
        {/* <AddressOrder/> */}
        {/* <PaymentOrder/> */}
        {/* <Order/> */}
        <div className="relative -z-10">
          <MainCarosel />
        </div>
        <div className="mx-10 lg:px-10">
          <HomeSectionCarosel />
          <HomeSectionCarosel />
          <HomeSectionCarosel />
        </div>

        {/* <ProductCard/> */}
        {/* <Category/> */}
        {/* <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32 -z-10">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your story starts with us.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This is a simple example of a Landing Page you can build using
                Material Tailwind. It features multiple components based on the
                Tailwind CSS and Material Design by Google.
              </Typography>
            </div>
          </div>
        </div>
      </div> */}
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
