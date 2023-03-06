import PostModel from "../../mongoDB/models/post.js";

const getAllPostsHandler = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("author").exec();

        let tags = {};
        posts.forEach((post) => {
            const { password, ...author } = post.author._doc;
            post.author = author;

            post.tags.forEach((tag) => {
                if (tags[tag]) {
                    tags[tag] = tags[tag] + 1;
                } else {
                    tags[tag] = 1;
                }
            });
        });

        tags = Object.entries(tags);
        tags = tags.sort((tag_one, tag_two) => tag_two[1] - tag_one[1]);
        tags = tags.slice(0, 7).map((tag) => tag[0]);

        return res.status(200).json({
            message: "Пул последних постов",
            status: 200,
            posts,
            tags,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Ошибка получения постов на стороне сервера",
            status: 500,
        });
    }
};

export default getAllPostsHandler;
