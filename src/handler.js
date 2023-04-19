const { Book, books } = require('./books');

// Menambahkan book baru berdasarkan body yang diberikan oleh request
const addBookHandler = (request, h) => {
  const {
    name = undefined,
    year = undefined,
    author = undefined,
    summary = undefined,
    publisher = undefined,
    pageCount = undefined,
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
    message: 'Catatan gagal ditambahkan',
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
module.exports = { addBookHandler, getAllBooksHandler };
