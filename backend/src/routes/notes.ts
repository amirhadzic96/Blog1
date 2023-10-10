import * as BlogsController from "../controllers/blogcontrollers";
import express from "express";

const router = express.Router();

router.get("/", BlogsController.getBlogs);

router.get("/:blogId", BlogsController.getBlog);

router.post("/", BlogsController.createBlogs);

export default router;