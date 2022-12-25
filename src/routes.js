const {
  saveBook, getBooks, getBookById, updateBookById, deleteBookById,
} = require('./handler');

const basePath = '/books';
const routes = [
  {
    method: 'POST',
    path: basePath,
    handler: saveBook,
  },
  {
    method: 'GET',
    path: basePath,
    handler: getBooks,
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: `${basePath}/{id}`,
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: deleteBookById,
  },
];

module.exports = routes;
