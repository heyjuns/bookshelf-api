const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return head + tail;
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
};
