import { body } from "express-validator";

const registrationValidator = [
    body("email", "Недопустимый почтовый адрес").isEmail(),
    body("password", "Недопустимый пароль").isLength({ min: 5 }),
    body("username", "Недопустимое имя пользователя").isLength({ min: 3 }),
];

export default registrationValidator;
