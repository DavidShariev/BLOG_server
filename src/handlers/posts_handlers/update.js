import PostModel from "../../mongoDB/models/post.js";

const updateHandler = async (req, res) => {
    try {
        await PostModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageURL: req.body.imageURL,
                author: req.userId,
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            message: "Пост изменен",
            status: 200,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Ошибка удаления поста на стороне сервера",
        });
    }
};

export default updateHandler;
