import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const booksAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.book?.title.localeCompare(b.book?.title),
});

const initialState = booksAdapter.getInitialState();
export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),

      transformResponse: (responseData) => {
        const loadedBook = responseData.data.map((book) => {
          book = book.book;
          return book;
        });
        return booksAdapter.setAll(initialState, loadedBook);
      },
      providesTags: (result, error, arg) => {
        console.log("result", result);
        if (result?.ids) {
          return [{ type: "Book", id: "LIST" }, ...result.ids.map((id) => ({ type: "Book", id }))];
        } else return [{ type: "Book", id: "LIST" }];
      },
    }),
    // getBook: builder.query({
    //   query: (bookId) => `/books/${bookId}`,
    //   providesTags: (result) => [
    //     {
    //       type: "Book",
    //       id: result.id,
    //     },
    //   ],
    // }),
    addNewBook: builder.mutation({
      query: ({ title, author }) => ({
        url: "/books",
        method: "POST",
        body: { title, author },
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, title, author }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: { title, author },
      }),
      invalidatesTags: [
        {
          type: "Book",
          id: ({ id }) => id,
        },
      ],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApiSlice;

export const booksSelectors = booksAdapter.getSelectors((state) => state.books);
