const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

class Library {
  constructor() {
    this.books = [];
  }

  addToTable(book) {
    const row = document.createElement("tr");
    console.log(book);
    for (const key of Object.keys(book1)) {
      const cell = document.createElement("td");
      cell.innerText =
        key === "read" ? (book[key] ? "Read" : "Not Read") : book[key];
      row.appendChild(cell);
      if (key === "read") row.appendChild(addUserOptions(book["read"]));
    }
    //add user options to each row in table
    tableBody.append(row);
  }

  addBooktoLibrary(book) {
    this.books.push(book);
    this.addToTable(book);
  }

  clearLibrary() {
    this.books = [];
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const library = new Library();

const book1 = new Book("Fahrenheit 451", "Ray Bradbury", "249", true);
const book2 = new Book("1984", "Geroge Orwell", "328", true);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "336", false);
const book4 = new Book("Lord of the FLies", "William Golding", "224", false);
for (const book of [book1, book2, book3, book4]) library.addBooktoLibrary(book);

//create table for books

const button = document.querySelector(".add-book");
const dialogElement = document.querySelector("#new-book");
const clearTable = document.querySelector(".clear-table");
const form = document.querySelector("form");
const cancelNewBook = document.querySelector(".cancel-new-book");

function addUserOptions(isRead) {
  const cell = document.createElement("td");
  cell.appendChild(deleteRow());
  cell.appendChild(toggleReadStatus(isRead));
  return cell;
}

function findId(e) {
  return e.target.parentNode.parentNode.querySelectorAll("td")[0].innerText;
}

function deleteRow() {
  const deleteRow = document.createElement("img");
  deleteRow.classList = "delete-row";
  deleteRow.src = "delete.svg";
  deleteRow.addEventListener("click", (e) => {
    // console.log(findId(e));
    // console.log(
    //   library.books.indexOf(library.books.find((book) => book.id === findId(e)))
    // );
    library.books.splice(
      library.books.findIndex((book) => book.id === findId(e)),
      1
    );
    table.deleteRow(e.target.parentNode.parentNode.rowIndex);
  });
  return deleteRow;
}

function toggleReadStatus(isRead) {
  const check = document.createElement("span");
  const img = document.createElement("img");
  img.src = isRead ? "checked.svg" : "unchecked.svg";
  check.appendChild(img);
  img.addEventListener("click", (e) => {
    const id =
      e.target.parentNode.parentNode.parentNode.querySelectorAll("td")[0]
        .innerText;
    const book =
      library.books[library.books.findIndex((book) => book.id === id)];
    book.read = !book.read;
    //change table read status
    e.target.parentNode.parentNode.parentNode.querySelectorAll(
      "td"
    )[4].innerText = book.read === true ? "Read" : "Not Read";
    e.target.src =
      e.target.src.split("/").pop() === "checked.svg"
        ? "unchecked.svg"
        : "checked.svg";
  });
  return check;
}

button.addEventListener("click", () => {
  dialogElement.showModal();
});

cancelNewBook.addEventListener("click", () => {
  dialogElement.close();
  form.reset();
});

document.addEventListener("click", (e) => {
  if (e.target === dialogElement) {
    dialogElement.close();
  }
});

clearTable.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your library?")) {
    table.removeChild(tableBody);
    const newTableBody = document.createElement("tbody");
    table.appendChild(newTableBody);
    library.clearLibrary();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userValues = e.target;
  console.log(e.target.title.value);
  const book = new Book(
    userValues.title.value,
    userValues.author.value,
    userValues.pages.value,
    userValues.read.checked
  );
  library.addBooktoLibrary(book);
  console.log(book);
  dialogElement.close();
  form.reset();
});
