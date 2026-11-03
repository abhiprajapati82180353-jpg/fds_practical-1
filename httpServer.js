import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 350 },
    { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", price: 400 }
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // GET /
    if (url === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Welcome to Library Management System</h1>");
    }

    // GET /books
    else if (url === "/books" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(books, null, 2));
    }

    // GET /about
    else if (url === "/about" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("This is the Library Book Management Application.");
    }

    // GET /home - serve HTML using the FS module
    else if (url === "/home" && method === "GET") {
        const filePath = path.join(__dirname, "public", "index.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (!res.headersSent) {
                    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                }
                res.end("Unable to read the HTML file.");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
        });
    }

    // POST /add-book
    else if (url === "/add-book" && method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const newBook = JSON.parse(body);

                if (
                    newBook.id === undefined ||
                    !newBook.title ||
                    !newBook.author ||
                    newBook.price === undefined
                ) {
                    res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                    res.end(JSON.stringify({ message: "Required fields: id, title, author and price" }));
                    return;
                }

                if (books.some((book) => book.id === newBook.id)) {
                    res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                    res.end(JSON.stringify({ message: "Book ID already exists" }));
                    return;
                }

                books.push(newBook);
                res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({
                    message: "Book added successfully",
                    book: newBook
                }, null, 2));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ message: "Invalid JSON data" }));
            }
        });
    }

    // Invalid route or unsupported method
    else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
