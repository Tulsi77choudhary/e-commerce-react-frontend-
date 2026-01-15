'use client'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import filters, { singleFilter } from './filterData'


import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { mens_kurta } from '../../../Data/mens_kurta'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from "../../../State/Product/Action";
import Pagination from '@mui/material/Pagination';

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { products, pageInfo } = useSelector(state => state.product);
  console.log("Info---", pageInfo);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color") || "";
  const sizeValue = searchParams.get("size") || "";
  const priceValue = searchParams.get("price") || "";
  const discount = searchParams.get("discount") || 0;
  const sortValue = searchParams.get("sort") || "price_low";
  const pageNumber = Number(searchParams.get("page") || 1);
  const stock = searchParams.get("stock") || "all";

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadioFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, value);

    navigate({ search: `?${searchParams.toString()}` });

    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: [value],
    }));
  };


  const handleFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search)
    let filterValue = searchParams.get(sectionId)?.split(',') || []

    if (filterValue.includes(value)) {
      filterValue = filterValue.filter((item) => item !== value)
      if (filterValue.length === 0) searchParams.delete(sectionId)
      else searchParams.set(sectionId, filterValue.join(','))
    } else {
      filterValue.push(value)
      searchParams.set(sectionId, filterValue.join(','))
    }

    const query = searchParams.toString()
    navigate({ search: `?${query}` })

    const newFilters = {}
    for (const [key, val] of searchParams.entries()) {
      newFilters[key] = val.split(',')
    }
    setSelectedFilters(newFilters)

  }

  // const removeFilter = (sectionId, value) => {
  //   handleFilter(sectionId, value)
  // }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const colorValue = searchParams.get("color") ? searchParams.get("color").split(",") : [];
    const sizeValue = searchParams.get("size") ? searchParams.get("size").split(",") : [];
    const priceValue = searchParams.get("price") || "";
    const discount = searchParams.get("discount") || 0;
    const sortValue = searchParams.get("sort") || "price_low";
    const pageNumber = Number(searchParams.get("page") || 1);
    const stock = searchParams.get("stock") || "all";

    const [minPrice, maxPrice] = priceValue ? priceValue.split(" ").map(Number) : [0, 1000000];

    const data = {
      category: param.levelThree,
      color: colorValue,
      size: sizeValue,
      minPrice,
      maxPrice,
      minDiscount: Number(discount) || 0,
      sort: sortValue,
      pageNumber: pageNumber - 1,
      pageSize: 1,
      stock: stock,
    };

    dispatch(findProducts(data));
  }, [location.search, param.levelThree]);


  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  onClick={() => handleFilter(section.id, option.value)}
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <span className="font-bold text-lg text-gray-900 flex items-center gap-1">
              <FilterListIcon /> Filters:
            </span>
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <FormControl>
                          <FormLabel id={`${section.id}-label`}>
                            {section.name}
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby={`${section.id}-label`}
                            name={`${section.id}-radio`}
                            value={selectedFilters[section.id]?.[0] || ""}
                            onChange={(event) => handleRadioFilter(section.id, event.target.value)} // <-- fix here
                          >
                            {section.options.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </DisclosurePanel>
                    </>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <FormControl>
                          <FormLabel id={`${section.id}-label`}>
                            {section.name}
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby={`${section.id}-label`}
                            name={`${section.id}-radio`}
                            value={selectedFilters[section.id]?.[0] || ""}
                            onChange={(event) => handleRadioFilter(section.id, event.target.value)} // <-- fix here
                          >
                            {section.options.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>


                        </FormControl>
                      </DisclosurePanel>
                    </>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}

              <div className="lg:col-span-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white py-4 px-4">

                  {products?.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          <section className="w-full px-[3.6rem]">
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                count={pageInfo?.totalPages || 1}
                page={(pageInfo?.currentPage || 0) + 1}
                color="primary"
                onChange={handlePaginationChange}
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default Product;
