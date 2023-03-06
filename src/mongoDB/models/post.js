import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        imageURL: String,
        viewsCount: {
            type: Number,
            default: 0,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", PostSchema);
