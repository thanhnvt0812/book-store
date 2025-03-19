const Book = require("./book.models");

/**
 * Handles the creation of a new book entry in the database.
 */
const postABook = async (req, res) => {
  try {
    // Create a new book instance with the data from the request body
    const newBook = await Book({ ...req.body });
    console.log(newBook);
    // Save the new book instance to the database
    await newBook.save();

    // Send a success response with the newly created book
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    // Log the error to the server console
    console.error("Error creating book", error);

    // Send an error response indicating failure to create a book
    res.status(500).send({ message: "Failed to create book" });
  }
};

/**
 * Retrieves all books from the database and sends them in the response.
 */
const getAllBooks = async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find().sort({ createdAt: -1 });

    // Send all retrieved books in the response
    res.status(200).send(books);
  } catch (error) {
    // Log the error to the server console
    console.error("Error fetching books", error);

    // Send an error response indicating failure to fetch books
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

/**
 * Retrieves a single book from the database by id and sends it in the response.
 */
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    // Retrieve the book from the database by id
    const book = await Book.findById(id);
    if (!book) {
      // If the book is not found, send a 404 response
      res.status(404).send({ message: "Book not Found!" });
    } else {
      // If the book is found, send it in the response
      res.status(200).send(book);
    }
  } catch (error) {
    // Log the error to the server console
    console.error("Error fetching book", error);
    // Send an error response indicating failure to fetch a book
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// update book data
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
};

// export const getSingleBookByID = async (id, req, res) => {
//   try {
//     // Retrieve the book from the database by id
//     const book = await Book.findById(id);
//     if (!book) {
//       // If the book is not found, send a 404 response
//       res.status(404).send({ message: "Book not Found!" });
//     } else {
//       // If the book is found, send it in the response
//       res.status(200).send(book);
//     }
//   } catch (error) {
//     // Log the error to the server console
//     console.error("Error fetching book", error);
//     // Send an error response indicating failure to fetch a book
//     res.status(500).send({ message: "Failed to fetch book" });
//   }
// };
