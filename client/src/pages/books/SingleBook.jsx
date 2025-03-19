/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../redux/features/books/booksApi";
import { getBooksImgUrl } from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);
  const dispatch = useDispatch();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Some errors occurred!!! please try again</div>;
  }
  return (
    <div class="py-10 px-4 flex justify-center items-center flex-wrap gap-4 border border-gray-300 rounded-lg p-2 shadow-lg">
      <div class="w-80">
        <img
          src={`${getBooksImgUrl(book.coverImage)}`}
          alt="Book Cover"
          class="w-full h-auto object-contain rounded-lg shadow-lg"
        />
      </div>
      <div class="max-w-md text-center md:text-left">
        <h3 class="text-3xl font-bold mb-5">{book?.title}</h3>
        <p class="text-lg text-gray-700 mb-8">
          <strong>Category:</strong> {book?.category}
        </p>
        <p class="text-lg text-gray-700 mb-8">
          <strong>Published:</strong>{" "}
          {new Date(book?.createdAt).toLocaleDateString()}
        </p>
        <p class="text-lg text-gray-700 mb-8">{book?.description}</p>
        <p class="text-lg text-gray-700 mb-8">
          <strong>Price:</strong>{" "}
          {book?.newPrice ? `$${book.newPrice}` : `$${book.price}`}
        </p>
        <button
          type="button"
          onClick={() => dispatch(addToCart(book.book))}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded space-x-1 flex items-center gap-1 cursor-pointer"
        >
          <FiShoppingCart className="" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
