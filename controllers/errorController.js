/* Function for sending errors in production */
const sendProdError = (err, res) => {
  /* Handling operational errors (trusted errors) */
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    /* Handling unexpected errors */
  } else {
    /* Logging error to console */
    console.log("ERROR 💥", err);

    /* Sending generic error message */
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/* Function for sending errors in development */
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/* Function for global error handling */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
