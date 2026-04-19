export const GENRES = {
  Pemrograman: "📖",
  Sains: "🔬",
  Matematika: "📐",
  Sejarah: "🏛️",
  Sastra: "🎭",
  Bisnis: "💼",
  Psikologi: "🧠",
  Lainnya: "📦",
};

export class Book {
  #stock;

  constructor({ id, title, author, year, genre, stock }) {
    this.id = id ?? Date.now();
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.#stock = stock;
    this.borrowed = 0; // jumlah yang sedang dipinjam
  }

  // Getter
  get stock() {
    return this.#stock;
  }

  get availableStock() {
    return this.#stock - this.borrowed;
  }

  get isAvailable() {
    return this.availableStock > 0;
  }

  get emoji() {
    return GENRES[this.genre] ?? "📦";
  }

  // Setter dengan validasi
  set stock(value) {
    if (typeof value !== "number" || value < 0) {
      throw new RangeError("Stok harus angka >= 0");
    }
    this.#stock = value;
  }

  // Methods
  borrow() {
    if (!this.isAvailable) {
      throw new Error(`Buku "${this.title}" sedang tidak tersedia`);
    }
    this.borrowed++;
  }

  return() {
    if (this.borrowed === 0) {
      throw new Error(`Tidak ada pinjaman aktif untuk "${this.title}"`);
    }
    this.borrowed--;
  }

  // Static factory method - buat Book dari plain object (dari localStorage)
  static fromJSON(data) {
    const book = new Book(data);
    book.borrowed = data.borrowed ?? 0;
    return book;
  }

  // Untuk disimpan ke localStorage
  toJson() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      year: this.year,
      genre: this.genre,
      stock: this.#stock,
      borrowed: this.borrowed,
    };
  }

  toString() {
    return `Book("${this.title}" by${this.author},${this.year})`;
  }
}

// Bonus: EBook extends Book
export class EBook extends Book {
  constructor({ id, title, author, year, genre, stock, fileSize, format }) {
    super({ id, title, author, year, genre, stock });
    this.fileSize = fileSize; // dalam MB
    this.format = format; // "PDF", "EPUB", dll
  }

  get emoji() {
    return "💻";
  }

  toString() {
    return `EBook("${this.title}",${this.format},${this.fileSize}MB)`;
  }
}
