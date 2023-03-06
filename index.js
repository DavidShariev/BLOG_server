import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import credentials from "./credentials.js";
import connection from "./src/mongoDB/main.js";
import allValidators from "./src/validations/all_validators.js";
import userHandlers from "./src/handlers/user_handlers/all_user_handlers.js";
import postHandlers from "./src/handlers/posts_handlers/all_post_handlers.js";
import checkAuth from "./src/utils/check_auth.js";
import multer from "multer";
import get_all_tags_handler from "./src/handlers/tags_handlers/get_all_tags.js";

connection();

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, name, cb) => {
        cb(null, name.originalname);
    },
});

const upload = multer({
    storage,
});

app.post("/upload/", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        message: "файл загружень",
        status: 200,
        url: `/uploads/${req.file.originalname}`,
    });
});
app.use("/uploads", express.static("uploads"));

app.post("/user/login", userHandlers.login);
app.post(
    "/user/registration",
    allValidators.registration,
    userHandlers.registration
);
app.post(
    "/user/update",
    checkAuth,
    allValidators.registration,
    userHandlers.update
);
app.get("/user/get-data", checkAuth, userHandlers.getData);

app.get("/users/:username", userHandlers.getByName);

app.post(
    "/posts/create",
    allValidators.createPost,
    checkAuth,
    postHandlers.create
);
app.get("/posts/", postHandlers.getAll);
app.get("/posts/:id", postHandlers.getOne);
// app.patch("/posts/", postHandlers.update)
app.delete("/posts/delete/:id", checkAuth, postHandlers.remove);
app.patch(
    "/posts/update/:id",
    allValidators.createPost,
    checkAuth,
    postHandlers.update
);
app.get("/posts/tag/:tag", postHandlers.getByTag);

app.get("/tags/", get_all_tags_handler);

app.listen(PORT, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log(`server has been started at PORT: ${PORT}`);
});
