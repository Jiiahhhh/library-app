import { Book } from "./Book.js";

const STORAGE_KEY = "library_books";

export class Library {
  #books;

  constructor() {
    this.#books = this.#loadFromStorage();
  }

  // Private method — load dari localStorage
  #loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data).map(Book.fromJSON);
    } catch (error) {
      console.error("Gagal load data:", error.message);
      return [];
    }
  }

  // Private method — simpan ke localStorage
  #saveToStorage() {
    try {
      const data = this.#books.map((book) => book.toJson());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Gagal simpan data:", error.message);
    }
  }

  // Public methods
  addBook(bookData) {
    const book = new Book({ ...bookData, id: Date.now() });
    this.#books.push(book);
    this.#saveToStorage();
    return book;
  }

  removeBook(id) {
    const index = this.#books.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Buku tidak ditemukan");
    this.#books.splice(index, 1);
    this.#saveToStorage();
  }

  borrowBook(id) {
    const book = this.#findById(id);
    book.borrow();
    this.#saveToStorage();
  }

  returnBook(id) {
    const book = this.#findById(id);
    book.return();
    this.#saveToStorage();
  }

  // Private helper
  #findById(id) {
    const book = this.#books.find((b) => b.id === id);
    if (!book) throw new Error("Buku tidak ditemukan");
    return book;
  }

  // Query methods
  getBooks({ search = "", genre = "" } = {}) {
    return this.#books.filter((book) => {
      const matchSearch =
        !search ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchGenre = !genre || book.genre === genre;
      return matchSearch && matchGenre;
    });
  }

  // Stats
  get totalBooks() {
    return this.#books.length;
  }

  get totalAvailable() {
    return this.#books.filter((b) => b.isAvailable).length;
  }

  get totalBorrowed() {
    return this.#books.reduce((sum, b) => sum + b.borrowed, 0);
  }
}
