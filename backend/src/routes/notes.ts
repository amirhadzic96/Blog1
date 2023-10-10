import * as BlogsController from "../controllers/blogcontrollers";
import express from "express";

const router = express.Router();

router.get("/", BlogsController.getBlogs);

router.get("/:blogId", BlogsController.getBlog);

router.patch("/:blogId", BlogsController.updateBlog);

router.post("/", BlogsController.createBlog);

router.delete("/:blogId", BlogsController.deleteBlog)

export default router;