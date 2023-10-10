import { RequestHandler } from "express";
import BlogModel from "../models/blogmodels";
import createHttpError from "http-errors";
import mongoose from "mongoose";


export const getBlogs: RequestHandler = async (req, res, next) => {
    try{
        const blogs = await BlogModel.find().exec();
        res.status(200).json(blogs);
    } catch(error) {
    next(error);
}
}

export const getBlog: RequestHandler = async (req,res,next) => {
    const blogId = req.params.blogId;
    try {
        if(!mongoose.isValidObjectId(blogId)) {
            throw createHttpError(400, "Wrong blog id")
        }
        const blog = await BlogModel.findById(blogId).exec();
        if(!blog) {
            throw createHttpError(404, "Blog not found")
        }
        res.status(200).json(blog);
        
    } catch (error) {
        next(error)
    }
}
interface createBlogBody {
    title?: string,
    text?: string,
    author?: string,
}
export const createBlog: RequestHandler<unknown,unknown,createBlogBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    try{
        if(!title) {
            throw createHttpError(400, "Blog needs a title ");
        }
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
interface updateBlogParams {
    blogId: string,
}

interface updateBlogBody {
    title?: string,
    text?: string,
    author?: string,
}
export const updateBlog: RequestHandler<updateBlogParams, unknown, updateBlogBody, unknown > = async (req, res, next) => {
    const blogId = req.params.blogId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newAuthor = req.body.author;
    try {
        if(!mongoose.isValidObjectId(blogId)) {
            throw createHttpError(400, "Wrong blog id")
        }

        if(!newTitle) {
            throw createHttpError(400, "Blog needs a title ");

        }
        const blog = await BlogModel.findById(blogId).exec();

     if(!blog) {
        throw createHttpError(404, "Blog not found")

     }

        blog.title = newTitle;
        blog.text = newText;
        blog.author = newAuthor;

        const updatedBlog = await blog.save();

        res.status(200).json(updatedBlog);

    } catch (error) {
        next(error)
        
    }
}

export const deleteBlog : RequestHandler = async (req, res ,next) => {
    const blogId = req.params.blogId;

    try {

        if(!mongoose.isValidObjectId(blogId)) {
            throw createHttpError(400, "Wrong blog id")
        }

        const blog = await BlogModel.findById(blogId).exec();

        if(!blog) {
            throw createHttpError(404, "Blog not found");

        }
        await blog.deleteOne();
        

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
}
