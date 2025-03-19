/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useGetBooksQuery } from "../../redux/features/books/booksApi";
import BookProductCard from "../books/BookProductCard";
import { useDispatch } from "react-redux";
import { getBooksImgUrl } from "../../utils/getImgUrl";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [] } = useGetBooksQuery();
  const dispatch = useDispatch();
  const categories = [
    "Choose a genre",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
  ];
  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">All Products</h2>
      {/* category filtering */}
      <div className="mb-8 items-center ">
        <select
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 outline-none mb-5"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="border-amber-500 rounded-md p-4 shadow-lg transition-shadow duration-300"
            >
              <BookProductCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
