import mongoose from "mongoose";
import PostModel from "../../mongoDB/models/post.js";

const get_all_tags_handler = async (req, res) => {
    try {
        let tags = {};
        await PostModel.find().then((posts) => {
            posts.forEach((post) => {
                post.tags.forEach((tag) => {
                    if (tags[tag]) {
                        tags[tag] = tags[tag] + 1;
                    } else {
                        tags[tag] = 1;
                    }
                });
            });
        });

        tags = Object.entries(tags);
        tags = tags.sort((tag_one, tag_two) => tag_two[1] - tag_one[1]);
        tags = tags.slice(0, 7).map((tag) => tag[0]);

        return res.status(200).json({
            message: "Теги получены",
            tags,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 500,
            message:
                "Не удалось получить список тэгов. Ошибка на стороне сервера.",
        });
    }
};

export default get_all_tags_handler;
