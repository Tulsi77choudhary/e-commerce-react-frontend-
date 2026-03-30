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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from "../../../State/Product/Action";
import Pagination from '@mui/material/Pagination';

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

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadioFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, value);
    navigate({ search: `?${searchParams.toString()}` });
    setSelectedFilters(prev => ({ ...prev, [sectionId]: [value] }));
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const colorValue = searchParams.get("color") ? searchParams.get("color").split(",") : [];
    const sizeValue = searchParams.get("size") ? searchParams.get("size").split(",") : [];
    const priceValue = searchParams.get("price") || "";
    const discount = searchParams.get("discount") || 0;
    const stock = searchParams.get("stock") || "all";
    const [minPrice, maxPrice] = priceValue ? priceValue.split(" ").map(Number) : [0, 1000000];

    // LOGIC EXACTLY SAME AS YOURS
    const data = {
      category: "", // Keeping this empty as per your working code
      color: colorValue,
      size: sizeValue,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: discount,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 10,
      stock: stock,
    };

    dispatch(findProducts(data));
  }, [location.search, param.levelThree]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel transition className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400">
                  <XMarkIcon className="size-6" />
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Sort <ChevronDownIcon className="-mr-1 ml-1 size-5 text-gray-400 group-hover:text-indigo-500" />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    {[{name: 'Price: Low to High'}, {name: 'Price: High to Low'}].map((option) => (
                      <MenuItem key={option.name}>
                        <button className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 w-full text-left">
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button onClick={() => setMobileFiltersOpen(true)} className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                <FunnelIcon className="size-5" />
              </button>
            </div>
          </div>

          <section className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              
              {/* SIDEBAR STYLING */}
              <aside className="hidden lg:block bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit sticky top-10">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                   <FilterListIcon /> <span className="font-bold text-gray-900">Filters</span>
                </div>
                <form className="space-y-4">
                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-100 py-4">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon className="size-4 group-data-open:hidden" />
                            <MinusIcon className="size-4 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-4">
                        <div className="space-y-3">
                          {section.options.map((option, idx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                onClick={() => handleFilter(section.id, option.value)}
                                id={`${section.id}-${idx}`}
                                type="checkbox"
                                className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`${section.id}-${idx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}

                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-100 py-4">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between py-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon className="size-4 group-data-open:hidden" />
                            <MinusIcon className="size-4 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-2">
                        <FormControl>
                          <RadioGroup
                            value={selectedFilters[section.id]?.[0] || ""}
                            onChange={(e) => handleRadioFilter(section.id, e.target.value)}
                          >
                            {section.options.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio size="small" />}
                                label={<span className="text-sm text-gray-600">{option.label}</span>}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </aside>

              {/* PRODUCT GRID STYLING */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 bg-transparent">
                  {products?.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <ProductCard product={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PAGINATION STYLING */}
          <div className="flex justify-center py-10 border-t border-gray-200">
             <Pagination
                count={pageInfo?.totalPages || 1}
                page={(pageInfo?.currentPage || 0) + 1}
                color="primary"
                onChange={handlePaginationChange}
                size="large"
              />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Product;