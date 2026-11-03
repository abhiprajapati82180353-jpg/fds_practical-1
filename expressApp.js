import express from "express";

const app = express();
const PORT = 4000;

// Middleware to read JSON request bodies
app.use(express.json());

// In-memory array (database is not required)
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        category: "Fiction"
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 400,
        category: "Biography"
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 550,
        category: "Programming"
    }
];

// GET /books - retrieve all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id - retrieve one book by ID
app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find((item) => item.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
});

// POST /books - add a new book
app.post("/books", (req, res) => {
    const { id, title, author, price, category } = req.body;

    if (
        id === undefined ||
        !title ||
        !author ||
        price === undefined ||
        !category
    ) {
        return res.status(400).json({
            message: "Required fields: id, title, author, price and category"
        });
    }

    if (books.some((item) => item.id === Number(id))) {
        return res.status(400).json({ message: "Book ID already exists" });
    }

    const newBook = {
        id: Number(id),
        title,
        author,
        price: Number(price),
        category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT /books/:id - update an existing book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find((item) => item.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, price, category } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (price !== undefined) book.price = Number(price);
    if (category !== undefined) book.category = category;

    res.status(200).json({
        message: "Book updated successfully",
        book
    });
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const bookIndex = books.findIndex((item) => item.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON data" });
    }
    res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
