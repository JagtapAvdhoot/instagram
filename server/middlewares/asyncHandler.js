const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res)).catch((error) => {
    next(error);
    process.env.NODE_ENV === 'development' && console.log(error);
  });
};

module.exports = asyncHandler;
