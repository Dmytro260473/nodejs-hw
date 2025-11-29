export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  
  if (!isProd) {
    console.error(err);
  }

  
  if (err.status) {
    res.status(err.status).json({
      message: err.message || "Error",
    });
    return;
  }

  
  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please, try again!"
      : err.message || "Internal Server Error",
  });
};
