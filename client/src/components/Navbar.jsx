/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { href, Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useGetBooksQuery } from "../redux/features/books/booksApi";
const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, logout } = useAuth();
  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
  ];
  const { data: books = [] } = useGetBooksQuery();
  // Xử lý tìm kiếm khi searchTerm thay đổi
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    if (!books || !Array.isArray(books)) {
      setSearchResults([]);
      return;
    }

    const filteredBooks = books.filter((book) => {
      const bookName = book?.name || book?.title || ""; // Hỗ trợ cả name hoặc title
      return bookName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log("Filtered results:", filteredBooks); // Debug log
    setSearchResults(filteredBooks);
  }, [searchTerm, books]);
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />

            {/* Search results dropdown */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                {searchResults.length > 0 ? (
                  searchResults.map((book) => (
                    <Link
                      key={book._id}
                      to={`/book/${book._id}`} // Giả sử bạn có route cho chi tiết sách
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setSearchTerm("")} // Xóa search term khi click
                    >
                      <div className="flex items-center gap-2">
                        <span>{book.title}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
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
          {/* <button className="hidden sm:block">
            <MdFavorite className="size-6" />
          </button> */}
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
