import express from "express";
import { createImage, uploadMiddleware } from "../controllers/createImageController.js";

const router = express.Router();

router.post("/", uploadMiddleware, createImage);

export { router as createImageRouter };