import PostModel from "../../mongoDB/models/post.js";

const createHandler = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            author: req.userId,
        });

        const post = await doc.save();

        return res.status(200).json({
            message: "Пост успешно создан",
            status: 200,
            postData: post._doc,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Ошибка обработки создания поста на стороне сервера",
            status: 500,
        });
    }
};

export default createHandler;
