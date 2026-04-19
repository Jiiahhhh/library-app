const statsGrid = document.getElementById("statsGrid");
const bookList = document.getElementById("bookList");
const emptyMsg = document.getElementById("emptyMsg");
const errorMsg = document.getElementById("errorMsg");

const inputTitle = document.getElementById("inputTitle");
const inputAuthor = document.getElementById("inputAuthor");
const inputYear = document.getElementById("inputYear");
const inputStock = document.getElementById("inputStock");
const inputGenre = document.getElementById("inputGenre");

// Render statistik dashboard
export function renderStats(library) {
  statsGrid.innerHTML = `
    <div class="stat-card total">
        <div class="stat-label">Total Buku</div>
        <div class="stat-value">${library.totalBooks}</div>
    </div>

    <div class="stat-card available">
        <div class="stat-label">Tersedia</div>
        <div class="stat-value">${library.totalAvailable}</div>
    </div>

    <div class="stat-card borrowed">
        <div class="stat-label">Dipinjam</div>
        <div class="stat-value">${library.totalBorrowed}</div>
    </div>
    `;
}

// Render daftar buku
export function renderBooks(books) {
  if (!books.length) {
    bookList.innerHTML = "";
    bookList.classList.add("hidden");
    emptyMsg.classList.remove("hidden");
    return;
  }

  bookList.classList.remove("hidden");
  emptyMsg.classList.add("hidden");

  bookList.innerHTML = books
    .map((book) => {
      const isAvailable = book.isAvailable;
      const canReturn = book.borrowed > 0;

      return `
        <div class="book-item" data-id="${book.id}">
          <div class="book-left">
            <span class="book-emoji">${book.emoji}</span>

            <div>
              <div class="book-title">${book.title}</div>
              <div class="book-author">${book.author}</div>
              <div class="book-meta">
                ${book.genre} · ${book.year} · 
                Stok: ${book.availableStock}/${book.stock}
              </div>
            </div>
          </div>

          <div class="book-right">
            <span class="stock-badge ${isAvailable ? "available" : "empty"}">
              ${isAvailable ? "Tersedia" : "Habis"}
            </span>

            <div class="book-actions">
              <button 
                class="btn-borrow" 
                data-id="${book.id}"
                ${!isAvailable ? "disabled" : ""}
              >
                Pinjam
              </button>

              <button 
                class="btn-return" 
                data-id="${book.id}"
                ${!canReturn ? "disabled" : ""}
              >
                Kembalikan
              </button>

              <button 
                class="btn-delete" 
                data-id="${book.id}"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

// Tampilkan error message
export function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}

// Sembunyikan error message
export function hideError() {
  errorMsg.textContent = "";
  errorMsg.classList.add("hidden");
}

// Reset form input
export function resetForm() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  inputStock.value = "";
  inputGenre.value = "";

  inputTitle.focus();
}
