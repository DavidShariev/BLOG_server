import PostModel from "../../mongoDB/models/post.js";

const removeHandler = async (req, res) => {
    PostModel.findOneAndDelete(
        {
            _id: req.params.id,
        },
        (err, doc) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({
                    message: "Не удалось удалить статью",
                    status: 500,
                });
            }

            return res.status(200).json({
                message: "Пост удален",
                status: 200,
            });
        }
    );
};

export default removeHandler;
