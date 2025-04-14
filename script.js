function Library() {
  this.books = [];
}

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const library = new Library();

Library.prototype.addBooktoLibrary = function () {
  console.log(library);
  console.log(this);
  library.books.push(this);
};

Object.setPrototypeOf(Book.prototype, Library.prototype);

const book1 = new Book("Harry Potter", "JK Rowling", "300", true);
book1.addBooktoLibrary();

//create table for books

const table = document.querySelector("table");
console.log(table);

const tableBody = document.querySelector("tbody");

for (book of library.books) {
  console.log(book);
  const row = document.createElement("tr");
  for (const key of Object.keys(book1)) {
    console.log(key);
    const cell = document.createElement("td");
    cell.innerText = book[key];
    row.appendChild(cell);
  }
  tableBody.append(row);
}
