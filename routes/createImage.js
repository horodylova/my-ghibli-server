import express from "express";

const router = express.Router();

router.post("/", createImage);

export { router as createImageRouter };