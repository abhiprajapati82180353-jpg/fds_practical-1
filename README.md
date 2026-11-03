# MT1-LABEXAM - Library Book Management Web Application

This project follows the supplied MT1 Lab Examination instructions.

## Requirements
- Node.js installed
- npm
- EchoAPI (or another API client) for POST, PUT and DELETE testing

## Setup
Open a terminal in this project folder and run:

```bash
npm install
```

## Part A: Built-in HTTP and FS modules
Start the HTTP server:

```bash
node httpServer.js
```

Server: http://localhost:3000

Test these GET URLs in a browser:
- http://localhost:3000/
- http://localhost:3000/books
- http://localhost:3000/about
- http://localhost:3000/home

Test POST in EchoAPI:
- Method: POST
- URL: http://localhost:3000/add-book
- Body type: JSON

Example body:

```json
{
  "id": 3,
  "title": "Python Basics",
  "author": "John",
  "price": 500
}
```

## Part B: Express REST API
Open a second terminal and run:

```bash
node expressApp.js
```

Server: http://localhost:4000

| Method | URL | Purpose |
|---|---|---|
| GET | http://localhost:4000/books | Get all books |
| GET | http://localhost:4000/books/1 | Get book by ID |
| POST | http://localhost:4000/books | Add a book |
| PUT | http://localhost:4000/books/1 | Update a book |
| DELETE | http://localhost:4000/books/1 | Delete a book |

For POST, choose Body -> raw -> JSON:

```json
{
  "id": 4,
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "price": 600,
  "category": "Programming"
}
```

For PUT, use a JSON body containing the fields to update, for example:

```json
{
  "title": "The Alchemist - Updated",
  "price": 450
}
```

## Notes
- No database is used. Data is stored in JavaScript arrays.
- The HTTP and Express applications run independently on ports 3000 and 4000.
- Data is reset to the initial sample array whenever the relevant server restarts.
- Add your own GitHub ID to your answer sheet and create the required GitHub repository named `MT1-LABEXAM`.
- Take your own screenshots while both servers and API tests are running. The screenshots folder is provided for them.
