import Book from "../Models/Book";

class BookService {
  getBooks() {
    return fetch("http://localhost:5001/api/Book")
      .then((response) => response.json())
      .then((data) =>
        data.map(
          (book) =>
            new Book(
              book.id,
              book.title,
              book.author,
              book.publisher,
              book.year
            )
        )
      );
  }

  getBookById(id) {
    return fetch(`http://localhost:5001/api/Book/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  addBook(book) {
    return fetch("http://localhost:5001/api/Book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  updateBook(book) {
    return fetch(`http://localhost:5001/api/Book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => data);
  }

  deleteBook(book) {
    return fetch(`http://localhost:5001/api/Book/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => data);
  }
}

export default BookService;
