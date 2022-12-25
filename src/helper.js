const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return head + tail;
};

const getBooksByTerms = (sourceData, { name, finished, reading }) => {
  if (name) {
    const filteredBooks = sourceData
      .filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    return filteredBooks;
  }
  if (finished) {
    const filteredBooks = sourceData
      .filter((book) => book.finished === (+finished !== 0));
    return filteredBooks;
  }
  if (reading) {
    return sourceData
      .filter((book) => book.reading === (+reading !== 0));
  }
  return sourceData;
};

const responseBuilder = ({
  status, message, data, code, h,
}) => {
  const response = h.response({
    status,
    message,
    data,
  });
  response.code(code);
  return response;
};

module.exports = {
  generateId,
  responseBuilder,
  getBooksByTerms,
};
