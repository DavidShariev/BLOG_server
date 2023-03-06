import createHandler from "./create.js";
import getAllPostsHandler from "./get_all_posts.js";
import getPostHandler from "./get_one_post.js";
import getPostsByTagHandler from "./get_posts_by_tag.js";
import removeHandler from "./remove.js";
import updateHandler from "./update.js";

const allPostHandlers = {
    create: createHandler,
    getAll: getAllPostsHandler,
    getOne: getPostHandler,
    remove: removeHandler,
    update: updateHandler,
    getByTag: getPostsByTagHandler,
};

export default allPostHandlers;
