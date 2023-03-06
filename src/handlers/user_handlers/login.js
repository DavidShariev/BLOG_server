import UserModel from "../../mongoDB/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentials from "../../../credentials.js";

const loginHandler = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({
                message: "Ошибка аторизации",
                status: 404,
            });
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user._doc.password
        );

        if (!isValidPassword) {
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

        const { password, ...userData } = user._doc;

        return res.status(200).json({
            message: "Вы успешно аторизованы",
            status: 200,
            userData,
            token,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Ошибка авторизации на стороне сервера.",
        });
    }
};

export default loginHandler;
