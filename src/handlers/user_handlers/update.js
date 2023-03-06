import UserModel from "../../mongoDB/models/user.js";
import bcrypt from "bcrypt";
import credentials from "../../../credentials.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const updateHandler = async (req, res) => {
    try {
        if (req.body.password) {
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

            await UserModel.findOneAndUpdate(
                {
                    _id: req.userId,
                },
                {
                    password: passwordHash,
                }
            );
        }

        const data = await UserModel.findOneAndUpdate(
            {
                _id: req.userId,
            },
            {
                username: req.body.username,
                email: req.body.email,
                avatarURL: req.body.avatarURL,
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            message: "Профиль настроен",
            status: 200,
            data,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            status: 500,
            message:
                "Не удалось изменить настройки профиля. Ошибка на стороне сервера.",
        });
    }
};

export default updateHandler;
