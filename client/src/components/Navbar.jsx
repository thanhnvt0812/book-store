/* eslint-disable no-unused-vars */
import React from "react";
import { href, Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const [isDropDown, setIsDropDown] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, logout } = useAuth();
  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
  ];
  // const user = false;
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to={"/"}>
            <GiBookshelf className="size-8" />
          </Link>
          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#EAEAEA] w-full py-1 md:px-8 pxx-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          {user ? (
            <div className="relative group ">
              <button onClick={() => setIsDropDown(!isDropDown)}>
                <img
                  src={avatar}
                  alt=""
                  className="size-7 rounded-full ring-2 ring-blue-500  "
                />
              </button>
              <ul className="hidden absolute py-2 left-0 mt-2 bg-gray-100 text-sm rounded shadow-md group-hover:block ">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="block px-4 py-2 text-sm hover:bg-gray-300">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="text-sm font-semibold">
              <FaUser className="size-6" />
            </Link>
          )}

          {/* <FaUser className="size-6" /> */}
          <button className="hidden sm:block">
            <MdFavorite className="size-6" />
          </button>
          <Link
            to={"/cart"}
            className="bg-yellow-500 p-1 sm:px-6 py-2 flex items-center rounded-sm"
          >
            <FaShoppingCart className="size-6" />
            <span className="text:sm font-semibold sm:ml-1">
              {cartItems.length > 0 ? `${cartItems.length}` : "0"}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
