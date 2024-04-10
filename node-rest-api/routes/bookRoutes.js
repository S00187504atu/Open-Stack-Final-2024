const express = require("express");
const router = express.Router();
// const booksController = require("../controllers/bookController");
const booksController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");

router.put("/:id", booksController.updateBookById);

// GET all books
router.get("", authController.protect, booksController.getAllBooks);

// GET a single book by ID
router.get("/:id", authController.protect, booksController.getBookById);

// Create a new book
router.post("", authController.isAdmin, booksController.createBook);

// Update a book by ID

// Delete a book by ID
router.delete("/:id", authController.isAdmin, booksController.deleteBookById);

module.exports = router;
