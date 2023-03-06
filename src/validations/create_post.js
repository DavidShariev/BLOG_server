import { body } from "express-validator";

const createPostValidator = [
    body("title", "Недопустимый заголовок поста")
        .isLength({ min: 3, max: 50 })
        .isString(),
    body("text", "Недопустимый текст поста")
        .isLength({ min: 3, max: 3000 })
        .isString(),
    body("tags", "Недопустимый формат тэгов").optional().isArray(),
    body("imageURL", "Недопустимая ссылка на изображение")
        .optional()
        .isString(),
];

export default createPostValidator;
