const express = require("express");
const morgan = require("morgan");

const playerRouter = require("./routes/playersRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

/************************ MIDDLEWARES ************************/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/************************ ROUTES ************************/
app.use("/api/v1/players", playerRouter);

/* If process reaches this block it means that no route has found */
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

/* Handling all errors and sending back response */
app.use(globalErrorHandler);

module.exports = app;
