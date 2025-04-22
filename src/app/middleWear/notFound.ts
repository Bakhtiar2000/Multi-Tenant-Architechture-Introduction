import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "API not found",
    error: "",
  });
};

export default notFound as (req: Request, res: Response) => void;
