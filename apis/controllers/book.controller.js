const connection = require("../configs/db.config");

const bookController = {
  getAllBooks: (req, res) => {
    connection.execute("SELECT * FROM Books", (error, result) => {
      if (error) {
        console.error("Error retrieving books: ", error);
        return res.status(500).json({ message: "Internal server error." });
      }

      if (result.length === 0)
        return res.status(404).json({ message: "No books found." });

      res.status(200).json(result);
    });
  },

  getBookById: (req, res) => {
    const { id } = req.params;
    connection.execute(
      "SELECT * FROM Books WHERE Id = ?",
      [id],
      (error, result) => {
        if (error) {
          console.error("Error retrieving book: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (!result)
          return res.status(404).json({ message: "Book not found." });

        res.status(200).json(result[0]);
      }
    );
  },

  addBook: (req, res) => {
    const { title, author, isbn, publishedDate } = req.body;

    if (!author) 
      return res.status(400).json({ message: " Author are required." });
    
    if (!title) 
      return res.status(400).json({ message: "Title are required." });
    

    connection.execute(
      "INSERT INTO Books (Title, Author, ISBN, PublishedDate) VALUES (?, ?, ?, ?)",
      [title, author, isbn, publishedDate],
      (error, result) => {
        if (error) {
          console.error("Error adding book: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }

        const insertedId = result.insertId;
        res.status(201).json({
          message: "Book added successfully.",
          book: {
            Id: insertedId,
            Title: title,
            Author: author,
            ISBN: isbn,
            PublishedDate: publishedDate,
          },
        });
      }
    );
  },

  updateBook: (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, publishedDate } = req.body;

    if (!author) 
      return res.status(400).json({ message: " Author are required." });
    
    if (!title) 
      return res.status(400).json({ message: "Title are required." });
    

    connection.execute(
      "UPDATE Books SET Title = ?, Author = ?, ISBN = ?, PublishedDate = ? WHERE Id = ?",
      [title, author, isbn, publishedDate, id],
      (error, result) => {
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Book not found." });
        if (error) {
          console.error("Error updating book: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }

        res.status(200).json({
          message: "Book updated successfully.",
          book: {
            Id: id,
            Title: title,
            Author: author,
            ISBN: isbn,
            PublishedDate: publishedDate,
          },
        });
      }
    );
  },

  deleteBook: (req, res) => {
    const { id } = req.params;

    connection.execute(
      "DELETE FROM Books WHERE Id = ?",
      [id],
      (error, result) => {
        if (error) {
          console.error("Error deleting book: ", error);
          return res.status(500).json({ message: "Internal server error." });
        }
        if(!result.affectedRows) return res.status(404).json({ message: "Book not found." });

        res.status(200).json({ message: "Book deleted successfully." });
      }
    );
  },
};

module.exports = bookController;
