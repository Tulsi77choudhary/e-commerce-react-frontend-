import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import AuthModal from '../Auth/AuthModel';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Avatar, Button, Menu, MenuItem, Badge } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationData";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Action/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(store => store.auth);
  const token = localStorage.getItem("token");

  const handleUserClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => {
    setOpenAuthModal(false);
    if(location.pathname === "/login" || location.pathname === "/register") navigate("/");
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  useEffect(() => {
    if (token && !auth.user) dispatch(getUser());
  }, [token, dispatch, auth.user]);

  useEffect(() => {
    if (auth.user) {
      setOpenAuthModal(false);
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
    }
  }, [auth.user, navigate, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-2xl">
                <div className="flex px-4 pb-2 pt-5 justify-end">
                  <button type="button" className="p-2 text-gray-400" onClick={() => setOpen(false)}>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-100">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-bold uppercase tracking-wider transition-all"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                </Tab.Group>
                {/* ... (Mobile Menu rest of the logic) */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Main Desktop Header */}
      <header className="relative z-40">
        <nav aria-label="Top" className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          {/* Announcement Bar */}
          <div className="bg-indigo-600 px-4 h-10 flex items-center justify-center text-sm font-bold text-white tracking-widest uppercase">
            Special Offer: Free shipping on orders above ₹999
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo & Mobile Toggle */}
              <div className="flex items-center">
                <button type="button" className="lg:hidden p-2 text-gray-500" onClick={() => setOpen(true)}>
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <div className="ml-4 flex lg:ml-0 cursor-pointer" onClick={() => navigate("/")}>
                  <img className="h-10 w-auto" src="https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png" alt="Logo" />
                  <span className="hidden md:block ml-2 text-xl font-black tracking-tighter text-indigo-600 italic">SHOPTRI</span>
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex lg:h-full lg:items-center">
                <Popover.Group className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? "text-indigo-600 border-indigo-600" : "text-gray-700 border-transparent",
                              "relative flex items-center border-b-2 pt-px text-sm font-bold uppercase tracking-widest hover:text-indigo-500 transition-all duration-200 outline-none"
                            )}
                          >
                            {category.name}
                          </Popover.Button>

                          <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute inset-x-0 top-full bg-white shadow-2xl border-t border-gray-100">
                              <div className="mx-auto max-w-7xl px-8 py-12 grid grid-cols-4 gap-x-8">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p className="font-black text-indigo-600 uppercase tracking-widest mb-6 border-b pb-2">{section.name}</p>
                                    <ul className="space-y-4">
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <p onClick={() => handleCategoryClick(category, section, item, close)} className="cursor-pointer text-gray-500 hover:text-indigo-600 font-medium transition-colors">
                                            {item.name}
                                          </p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                <div className="col-span-1 grid grid-cols-1 gap-4">
                                  {category.featured.map((item) => (
                                    <div key={item.name} className="group relative rounded-xl overflow-hidden shadow-md">
                                      <img src={item.imageSrc} className="h-32 w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                        <span className="text-white font-bold text-xs uppercase tracking-widest">{item.name}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </Popover.Group>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-6">
                
                {/* Search */}
                <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>

                {/* Profile */}
                <div className="flex items-center">
                  {auth.user ? (
                    <div>
                      <Avatar
                        onClick={handleUserClick}
                        className="shadow-md border-2 border-indigo-100 hover:border-indigo-600 transition-all"
                        sx={{ bgcolor: "#9155fd", cursor: "pointer", width: 36, height: 36, fontSize: '0.9rem' }}
                      >
                        {auth?.user?.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Menu anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseUserMenu} PaperProps={{ elevation: 3, sx: { mt: 1.5, borderRadius: '12px', minWidth: 150 } }}>
                        <MenuItem className="text-sm font-bold text-gray-700" onClick={() => { handleCloseUserMenu(); navigate("/account/profile"); }}>Profile</MenuItem>
                        <MenuItem className="text-sm font-bold text-gray-700" onClick={() => { handleCloseUserMenu(); navigate("/account/order"); }}>My Orders</MenuItem>
                        <hr className="my-1 border-gray-100" />
                        <MenuItem className="text-sm font-bold text-red-500" onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button onClick={handleOpen} variant="text" sx={{ color: "#4B5563", fontWeight: 'bold', fontSize: '0.85rem' }}>Sign In</Button>
                  )}
                </div>

                {/* Cart Badge */}
                <div className="flow-root">
                  <button onClick={() => navigate("/cart")} className="group -m-2 flex items-center p-2 relative">
                    <Badge badgeContent={2} color="secondary" overlap="circular">
                      <ShoppingBagIcon className="h-6 w-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                    </Badge>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal for Auth */}
      <AuthModal handleClose={handleClose} open={openAuthModal} />
      
      {/* Padding to prevent content from going under sticky navbar */}
      <div className="pt-24 lg:pt-28"></div>
    </div>
  );
}