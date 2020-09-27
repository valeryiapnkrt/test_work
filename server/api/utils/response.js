const response = {
  success: (res, data, message) => res.json({status: 1, ...data, message}),
  message: (res, message) => res.json({status: 1, message}),
  error: (res, message, data, code) => res.status(code || 500).json({message, ...data}),
  unauthorized: (res, message, data) => res.status(401).json({message, ...data}),
  exist: (res, message) => res.status(400).json({status: 1, message}),
  notFound: (res, message, data) => res.status(404).json({message, ...data}),
  serverError: (res, message, data) => res.status(500).json({message, ...data}),
  file: (res, buffer) => res.end(new Buffer(buffer), "binary"),
};

module.exports = response;
