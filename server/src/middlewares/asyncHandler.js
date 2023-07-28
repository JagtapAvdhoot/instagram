const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res)).catch((error) => {
    next(error);
    console.log(error);
  });
};

module.exports = asyncHandler;
