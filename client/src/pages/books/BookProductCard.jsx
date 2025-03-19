/* eslint-disable no-unused-vars */
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getBooksImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookProductCard = (book) => {
  //   console.log(book.book._id);
  const dispatch = useDispatch();

  return (
    <div className="rounded-lg transition-shadow duration-300 p-4 flex gap-4">
      {/* Hình ảnh */}
      <div className="w-1/3 flex-shrink-0 overflow-hidden">
        <Link to={`/book/${book.book._id}`}>
          <img
            src={`${getBooksImgUrl(book.book.coverImage)}`}
            alt={book.book.title}
            className="w-full h-full object-cover p-2  cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>

      {/* Thông tin */}
      <div className="w-2/3 flex flex-col justify-between">
        <div>
          <Link to={`/book/${book.book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.book.title}
            </h3>
          </Link>
          <p className="font-medium mb-5">
            ${book.book.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              ${book.book.oldPrice}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(addToCart(book.book))}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded space-x-1 flex items-center gap-1 cursor-pointer w-fit"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookProductCard;
