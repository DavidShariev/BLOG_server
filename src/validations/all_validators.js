import createPostValidator from "./create_post.js";
import registrationValidator from "./registration.js";

const allValidators = {
    registration: registrationValidator,
    createPost: createPostValidator,
};

export default allValidators;
