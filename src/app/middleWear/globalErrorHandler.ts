import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleMongooseValidationError from "../errors/handleMongooseValidationError";
import handleMongooseCastError from "../errors/handleMongooseCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import ApiError from "../errors/ApiError";

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  // Error handling logic
  const handleError = (errorFunction: any, err: any) => {
    const simplifiedError = errorFunction(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  };

  if (err instanceof ZodError) {
    handleError(handleZodError, err);
  } else if (err?.name === "ValidationError") {
    handleError(handleMongooseValidationError, err);
  } else if (err?.name === "CastError") {
    handleError(handleMongooseCastError, err);
  } else if (err?.code === 11000) {
    handleError(handleDuplicateError, err);
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // Send final response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
