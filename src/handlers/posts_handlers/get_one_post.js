import PostModel from "../../mongoDB/models/post.js";

const getPostHandler = async (req, res) => {
    PostModel.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $inc: { viewsCount: 1 },
        },
        {
            populate: "author",
            returnDocument: "after",
        },
        (err, doc) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    message: "Ошибка получения статьи на стороне сервера",
                    status: 500,
                });
            }

            return res.status(200).json({
                message: "Данные поста получены",
                status: 200,
                postData: doc,
            });
        }
    );
};

export default getPostHandler;
