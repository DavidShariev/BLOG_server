import jwt from "jsonwebtoken";
import credentials from "../../credentials.js";

const checkAuth = (req, res, next) => {
    const token = req.headers.authorization.replace(/Bearer\s?/, "");

    if (token) {
        try {
            const decoded = jwt.verify(token, credentials.jwtSecret);
            req.userId = decoded._id;
            return next();
        } catch (err) {
            console.error(err.message);
            return res.status(403).json({
                message: "Ошибка получения данных ",
                status: 403,
            });
        }
    } else {
        console.error(err.message);
        res.status(403).json({
            message: "Ошибка получения данных пользователя",
            status: 403,
        });
    }
};

export default checkAuth;
