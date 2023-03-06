import PostModel from "../../mongoDB/models/post.js";

const getPostsByTagHandler = async (req, res) => {
    try {
        let posts;

        if (req.params.tag === "new") {
            posts = await PostModel.find()
                .sort({
                    createdAt: -1,
                })
                .populate("author")
                .exec();
        } else if (req.params.tag === "popular") {
            posts = await PostModel.find()
                .sort({
                    viewsCount: -1,
                })
                .populate("author")
                .exec();
        } else {
            posts = await PostModel.find({
                tags: req.params.tag,
            })
                .populate("author")
                .exec();
        }

        return res.status(200).json({
            message: "Пул постов по тегу",
            status: 200,
            posts,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 500,
            message: "Не удалось получить посты. Ошибка на стороне сервера.",
        });
    }
};

export default getPostsByTagHandler;
