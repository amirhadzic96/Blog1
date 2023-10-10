import { InferSchemaType, model, Schema } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    author: {type: String},
});

type Blog = InferSchemaType<typeof blogSchema>;

export default model<Blog>("Blog", blogSchema);