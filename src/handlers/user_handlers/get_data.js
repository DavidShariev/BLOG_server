import UserModel from "../../mongoDB/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentials from "../../../credentials.js";

const getData = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            _id: req.userId,
        });

        if (!user) {
            return res.status(404).json({
                message: "Ошибка аторизации",
                status: 404,
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            credentials.jwtSecret,
            {
                expiresIn: "30d",
            }
        );

        return res.status(200).json({
            message: "Вы успешно аторизованы",
            status: 200,
            userData: user._doc,
            token,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Ошибка авторизации на стороне сервера",
        });
    }
};

export default getData;
