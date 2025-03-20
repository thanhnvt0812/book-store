/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://cors-anywhere.herokuapp.com/${
      import.meta.env.VITE_LOCAL_URL
    }/api/books`,
    credentials: "include",
    mode: "no-cors",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookByIdQuery,
} = booksApi;
export default booksApi;
