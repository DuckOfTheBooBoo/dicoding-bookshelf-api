const { Book, books } = require('./books');

// Menambahkan book baru berdasarkan body yang diberikan oleh request
const addBookHandler = (request, h) => {
  const {
    name = '',
    year = 0,
    author = '',
    summary = '',
    publisher = '',
    pageCount = 0,
    readPage = 0,
    reading = false,
  } = request.payload;

  // Melempar error 400 jika nama buku tidak dilampirkan
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;

  }

  // Melempar error 400 jika readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const newBook = new Book(name, year, author, summary, publisher, pageCount, readPage, reading);
  books.push(newBook);

  const isSuccess = books.filter((book) => book.name === name).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Mengembalikan semua buku yang ada dalam array books
const getAllBooksHandler = (_, h) => {
  const getBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      getBooks,
    },
  });
  response.code(200);
  return response;
};

// Memberikan response buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((tBook) => tBook.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Mengubah isi data buku
const updateBookById = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const bookIndex = books.findIndex((book) => book.id === id);

  // Melempar error 400 jika nama tidak dilampirkan
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Melempar error 400 jika readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  // Melempar error 404 jika id tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookById,
  deleteBookById,
};
