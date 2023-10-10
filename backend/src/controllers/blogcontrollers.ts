import { RequestHandler } from "express";
import BlogModel from "../models/blogmodels";

export const getBlogs: RequestHandler = async (req, res, next) => {
    try{
        const blogs = await BlogModel.find().exec();
        res.status(200).json(blogs);
    } catch(error) {
    next(error);
}
}

export const getBlog: RequestHandler = async (req,res,next) => {
    const blogId = req.params.blogsId;
    try {
        const blog = await BlogModel.findById(blogId).exec();
        res.status(200).json(blog);
        
    } catch (error) {
        next(error)
    }
}
export const createBlogs: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    try{
        const newBlog = await BlogModel.create({
        title : title,
        text: text,
        author: author,
    });
    res.status(201).json(newBlog);
    } catch(error) {
    next(error);
}
}

