import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  Box,
  Button,
  Checkbox,
  Pagination,
  PaginationItem,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HomeCard from "../HomePage/HomeCard";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProduts, getProducts } from "../../State/User/Product/Action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const sortOptions = [
  { name: "Price: Low to High", id: "price_low", current: false },
  { name: "Price: High to Low", id: "price_high", current: false },
];
const filters = [
  {
    id: "discount",
    name: "Khuyến Mãi",
    options: [
      { value: "5", label: "🔝 5%", checked: false },
      { value: "10", label: "🔝 10%", checked: false },
      { value: "20", label: "🔝 20%", checked: true },
      { value: "30", label: "🔝 30%", checked: false },
      { value: "40", label: "🔝 40%", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterProduct() {
  const { uproduct } = useSelector((store) => store);
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  console.log("Uproduct",uproduct);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;

  //Phan trang
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleTextFilter = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);

      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const [productData, setProductData] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    const priceValue = parseInt(value);
    setProductData((prev) => ({
      ...prev,
      [name]: isNaN(priceValue) ? "" : priceValue,
    }));
  };

  useEffect(() => {
    const minPrice =
      productData.minPrice === "" ? 0 : parseInt(productData.minPrice);
    const maxPrice =
      productData.maxPrice === "" ? 100000000 : parseInt(productData.maxPrice);
    const data = {
      categoryName: param.categoryName,
      size: "",
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 4,
    };
    dispatch(findProduts(data));
  }, [
    param.categoryName,
    discount,
    productData.minPrice,
    productData.maxPrice,
    sortValue,
    pageNumber,
  ]);

  // useEffect(() => {
  //   const data = {
  //     pageNumber: pageNumber - 1,
  //     pageSize: 2,
  //   };
  //   dispatch(getProducts(data));
  // }, [pageNumber]);

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              <FilterAltIcon
                sx={{ fontSize: 40, bottom: 3, position: "relative" }}
              />
              Lọc Sản Phẩm
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.id}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                              onClick={(e) => handleTextFilter(e, option.id)}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <div>
                  <Typography variant="h5" className="text-black">
                    Price
                  </Typography>
                  <div className="flex justify-around items-center py-5">
                    <TextField
                      variant="outlined"
                      className="w-[40%]"
                      label="min"
                      value={productData.minPrice}
                      onChange={handleTextFieldChange}
                      name="minPrice"
                    />
                    <span>:</span>
                    <TextField
                      variant="outlined"
                      className="w-[40%]"
                      label="max"
                      value={productData.maxPrice}
                      onChange={handleTextFieldChange}
                      name="maxPrice"
                    />
                  </div>
                </div>

                {filters.map((section) => (
                  <Box>
                    <div className="flex justify-between items-center">
                      <Typography variant="h6" className="text-black">
                        {section.name}
                      </Typography>
                      <AddIcon />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-black">
                      {section.options.map((item) => (
                        <div className="flex items-center">
                          <Checkbox
                            name={`${section.id}[]`}
                            value={item.value}
                            onChange={() =>
                              handleFilter(item.value, section.id)
                            }
                          />
                          <Typography variant="body2">{item.label}</Typography>
                        </div>
                      ))}
                    </div>
                    <hr />
                  </Box>
                ))}
                <div className="bg-blue-700 rounded-xl mt-5">
                  <Button className="px-5 w-full" sx={{ color: "white" }}>
                    <SearchIcon />
                    Seach
                  </Button>
                </div>
              </form>

              {/* Product grid */}
              {uproduct.products && uproduct.products.result.content.length !== 0 ? (
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-4 gap-5">
                    {uproduct.products.result &&
                      uproduct?.products?.result?.content.map((item) => (
                        <ProductCard product={item} />
                      ))}
                  </div>
                  <div className="flex justify-center p-5">
                    {/* <Pagination count={10} color="primary" /> */}
                    <Pagination
                      sx={{
                        p: 2,
                        mt: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      count={
                        uproduct.products && uproduct.products.result.totalPages
                      }
                      color="primary"
                      renderItem={(item) => (
                        <PaginationItem
                          slots={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                          sx={{ color: "black" }}
                        />
                      )}
                      onChange={handlePaginationChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-3">
                  <img src="https://eonbazar.com/images/npf.jpg" alt="" />
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
