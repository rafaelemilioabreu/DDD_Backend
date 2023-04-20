class Book {
  constructor( id, title, author, publisher, year) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year.slice(0,4);
  }
}

export default Book;
