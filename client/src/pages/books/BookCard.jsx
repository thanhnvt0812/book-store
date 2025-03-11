/* eslint-disable no-unused-vars */
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";

const BookCard = (book) => {
  //   console.log(book.book._id);

  return (
    <div className="rounded-lg transition-shadow duration-300 border-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md border-none">
          <Link to={`/book/${book.book._id}`}>
            <img
              src={`${getImgUrl(book.book.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/book/${book.book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book.book.description.length > 80
              ? book.book.description.slice(0, 80) + "..."
              : book.book.description}
          </p>
          <p className="font-medium mb-5">
            ${book.book.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book.book.oldPrice}
            </span>
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded space-x-1 flex items-center gap-1 ">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
