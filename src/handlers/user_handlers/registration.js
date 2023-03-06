import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../../mongoDB/models/user.js";
import bcrypt from "bcrypt";
import credentials from "../../../credentials.js";

const registrationHandler = async (req, res) => {
    try {
        const { errors } = validationResult(req);
        console.log(errors);
        if (errors.length !== 0) {
            return res.status(400).json({
                message: "Неверные данные",
                errors,
            });
        }

        const salt = await bcrypt.genSalt(credentials.salt);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            avatarURL: req.body.avatarURl,
            password: passwordHash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            credentials.jwtSecret,
            {
                expiresIn: "30d",
            }
        );

        const { password, ...userData } = user._doc;

        return res.status(200).json({
            message: "Вы успешно зарегестрированы",
            status: 200,
            userData,
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Ошибка регистрации на стороне сервера",
            status: 500,
        });
    }
};

export default registrationHandler;
