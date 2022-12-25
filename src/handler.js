/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const { generateId, responseBuilder, getBooksByTerms } = require('./helper');
const books = require('./books');

const saveBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = generateId();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    insertedAt,
    updatedAt,
    finished,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  if (!name) {
    return responseBuilder({
      h,
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return responseBuilder({
      h,
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  books.push(newBook);
  const isSuccess = books.some((book) => book.id === id);

  if (isSuccess) {
    return responseBuilder({
      h,
      code: 201,
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
  }

  return responseBuilder({
    h,
    code: 500,
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
};

const getBooks = (request, h) => {
  const { name, finished, reading } = request.query;
  const sourceBooks = getBooksByTerms(books, { name, finished, reading });
  return responseBuilder({
    h,
    code: 200,
    status: 'success',
    data: {
      books: sourceBooks.map(({ id, name, publisher } = book) => ({ id, name, publisher })),
    },
  });
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];

  if (book) {
    return responseBuilder({
      h,
      code: 200,
      status: 'success',
      data: {
        book,
      },
    });
  }

  return responseBuilder({
    h,
    code: 404,
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
};
const updateBookById = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const indexBook = books.findIndex((book) => book.id === id);
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  if (!name) {
    return responseBuilder({
      h,
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return responseBuilder({
      h,
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  if (indexBook !== -1) {
    books[indexBook] = {
      ...books[indexBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    return responseBuilder({
      h,
      code: 200,
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }
  return responseBuilder({
    h,
    code: 404,
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};
const deleteBookById = (request, h) => {
  const { id } = request.params;
  const indexBook = books.findIndex((book) => book.id === id);

  if (indexBook !== -1) {
    books.splice(indexBook, 1);
    return responseBuilder({
      h,
      code: 200,
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }
  return responseBuilder({
    h,
    code: 404,
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
};

module.exports = {
  saveBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
