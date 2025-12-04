const tableBody = document.querySelector("tbody");

function Library() {
  if (!new.target) {
    throw Error("You must use 'new' operator to call Library constructor");
  }
  this.books = [];
}

Library.prototype.addBookToLibrary = function (book) {
  this.books.push(book);
  displayBook(book);
};

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use 'new' operator to call Book constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    readValue = this.read ? "has been read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readValue}`;
  };
}
const library = new Library();
const book1 = new Book("Fahrenheit 451", "Ray Bradbury", "249", true);
const book2 = new Book("1984", "Geroge Orwell", "328", true);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "336", false);
const book4 = new Book("Lord of the FLies", "William Golding", "224", false);
const bookList = [book1, book2, book3, book4];
for (const book of bookList) library.addBookToLibrary(book);

function findBookFromTable(row) {
  const id = row.querySelector(".id").innerText;
  return library.books.findIndex((book) => book.id === id);
}

function deleteRow() {
  const deleteRow = document.createElement("img");
  deleteRow.classList = "delete-row";
  deleteRow.src = "delete.svg";
  deleteRow.addEventListener("click", (e) => {
    const row = e.target.parentNode.parentNode;
    const bookIndex = findBookFromTable(row);
    library.books.splice(bookIndex, 1);
    tableBody.removeChild(row);
    // console.log(library);
  });
  return deleteRow;
}

function toggleRead(isRead) {
  const readStatus = document.createElement("img");
  readStatus.src = isRead ? "checked.svg" : "unchecked.svg";
  readStatus.addEventListener("click", (e) => {
    const row = e.target.parentNode.parentNode;
    const bookIndex = findBookFromTable(row);
    const book = library.books[bookIndex];
    book.read = !book.read;
    readStatus.src = book.read ? "checked.svg" : "unchecked.svg";
    row.querySelector(".read").innerText = book.read ? "Read" : "Not Read";
    console.log(book);
  });
  return readStatus;
}

function userOptions(isRead) {
  const cell = document.createElement("td");
  cell.appendChild(deleteRow());
  cell.appendChild(toggleRead(isRead));
  return cell;
}

function displayBook(book) {
  const row = document.createElement("tr");
  for (const key in book) {
    if (typeof book[key] !== "function") {
      const cell = document.createElement("td");
      cell.classList = key;
      cell.innerText =
        key !== "read" ? book[key] : book[key] === true ? "Read" : "Not Read";
      row.appendChild(cell);
    }
  }
  row.append(userOptions(book.read));
  tableBody.appendChild(row);
}

const form = document.querySelector("form");
const addBookBtn = document.querySelector(".add-book");
const dialogElement = document.querySelector("#new-book");
const closeDialog = document.querySelector(".cancel-new-book");
const clearTable = document.querySelector(".clear-table");

addBookBtn.addEventListener("click", (e) => {
  dialogElement.showModal();
  document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === dialogElement) {
      dialogElement.close();
    }
  });
});

closeDialog.addEventListener("click", () => {
  dialogElement.close();
  form.reset();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  bookInputs = [];
  for (element of form.elements) {
    if (element.tagName === "INPUT") {
      if (element.type === "checkbox") {
        bookInputs.push(element.checked);
        continue;
      }
      bookInputs.push(element.value);
    }
  }
  const userBook = new Book(...bookInputs);
  library.addBookToLibrary(userBook);
  form.reset();
});

clearTable.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your library?")) {
    console.log("Clearing Table of length: " + library.books.length);
    tableBody.innerText = "";
    library.books = [];
    console.log(library.books);
  }
});
