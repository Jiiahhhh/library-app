import { Library } from "./models/Library.js";
import {
  renderStats,
  renderBooks,
  showError,
  hideError,
  resetForm,
} from "./ui.js";

/* =========================
   INIT
========================= */
const library = new Library();

let currentSearch = "";
let currentGenre = "";

/* =========================
   DOM ELEMENTS
========================= */
const btnAdd = document.getElementById("btnAdd");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const filterGenre = document.getElementById("filterGenre");

const inputTitle = document.getElementById("inputTitle");
const inputAuthor = document.getElementById("inputAuthor");
const inputYear = document.getElementById("inputYear");
const inputStock = document.getElementById("inputStock");
const inputGenre = document.getElementById("inputGenre");

/* =========================
   RENDER
========================= */
function render() {
  renderStats(library);

  const books = library.getBooks({
    search: currentSearch,
    genre: currentGenre,
  });

  renderBooks(books);
}

/* =========================
   ADD BOOK
========================= */
btnAdd.addEventListener("click", () => {
  try {
    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = Number(inputYear.value);
    const stock = Number(inputStock.value);
    const genre = inputGenre.value;

    // manual validation
    if (!title) throw new Error("Judul buku wajib diisi");
    if (!author) throw new Error("Nama penulis wajib diisi");
    if (!year) throw new Error("Tahun terbit wajib diisi");
    if (!genre) throw new Error("Genre wajib dipilih");
    if (!stock || stock < 1) throw new Error("Stok minimal 1");

    hideError();

    library.addBook({
      title,
      author,
      year,
      genre,
      stock,
    });

    resetForm();
    render();
  } catch (error) {
    showError(error.message);
  }
});

/* =========================
   BOOK ACTIONS (Delegation)
========================= */
bookList.addEventListener("click", (e) => {
  const target = e.target;

  try {
    // DELETE
    if (target.classList.contains("btn-delete")) {
      const id = Number(target.dataset.id);
      library.removeBook(id);
      hideError();
      render();
      return;
    }

    // BORROW
    if (target.classList.contains("btn-borrow")) {
      const id = Number(target.dataset.id);
      library.borrowBook(id);
      hideError();
      render();
      return;
    }

    // RETURN
    if (target.classList.contains("btn-return")) {
      const id = Number(target.dataset.id);
      library.returnBook(id);
      hideError();
      render();
      return;
    }
  } catch (error) {
    showError(error.message);
    render();
  }
});

/* =========================
   SEARCH
========================= */
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  render();
});

/* =========================
   FILTER GENRE
========================= */
filterGenre.addEventListener("change", (e) => {
  currentGenre = e.target.value;
  render();
});

/* =========================
   INITIAL RENDER
========================= */
render();
