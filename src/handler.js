const { Book, books } = require('./books');
const { objectHasItems, bookFilter } = require('./misc');

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
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
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
const getAllBooksHandler = (request, h) => {

  // response placeholder
  let response;

  // Try to get query parameters
  const queryParams = request.query;

  if (objectHasItems(queryParams)) {
    const {
      name = '',
      reading = undefined,
      finished = undefined,
    } = queryParams;

    // GET all book containing specific name
    if (name) {
      const nameLower = name.toLowerCase();
      const booksWithSpecifiNames = books.filter(
        (book) => book.name.toLowerCase().includes(nameLower),
      );

      if (booksWithSpecifiNames.length > 0) {
        response = h.response({
          status: 'success',
          data: {
            book: bookFilter(booksWithSpecifiNames),
          },
        });
        response.code(200);
        return response;
      }
      response = h.response({
        status: 'success',
        data: {
          book: [],
        },
      });
      response.code(200);
      return response;
    }

    // GET specific books with reading query params
    if (reading !== undefined) {
      if (reading === 1) {
        const booksCurrentlyRead = books.filter((book) => book.reading === true);

        if (objectHasItems(booksCurrentlyRead)) {
          response = h.response({
            status: 'success',
            data: {
              book: bookFilter(booksCurrentlyRead),
            },
          });
          return response;
        }
      } else if (reading === 0) {
        const booksCurrentlyUnread = books.filter((book) => book.reading === false);

        if (objectHasItems(booksCurrentlyUnread)) {
          response = h.response({
            status: 'success',
            data: {
              book: bookFilter(booksCurrentlyUnread),
            },
          });
          return response;
        }
      }
    }

    if (finished !== undefined) {
      if (finished === 1) {
        const finishedBooks = books.filter((book) => book.finished === true);

        if (objectHasItems(finishedBooks)) {
          response = h.response({
            status: 'success',
            data: {
              book: bookFilter(finishedBooks),
            },
          });
          return response;
        }

      } else if (finished === 0) {
        const unfinishedBooks = books.filter((book) => book.finished === false);

        if (objectHasItems(unfinishedBooks)) {
          response = h.response({
            status: 'success',
            data: {
              book: bookFilter(unfinishedBooks),
            },
          });
          return response;
        }
      }
    }
  }

  response = h.response({
    status: 'success',
    data: {
      books: bookFilter(books),
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
