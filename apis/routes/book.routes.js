const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/:id", authMiddleware, bookController.getBookById);
router.post("/", authMiddleware, bookController.addBook);
router.put("/:id", authMiddleware, bookController.updateBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
