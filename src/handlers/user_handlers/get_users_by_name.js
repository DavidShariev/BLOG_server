import UserModel from "../../mongoDB/models/user.js";

const getUsersByNameHandler = async (req, res) => {
    try {
        console.log(req.params.username);
        const usersList = await UserModel.find({
            username: { $regex: req.params.username, $options: "i" },
        });
        console.log(usersList);
        return res.status(200).json({
            message: "Пул пользователей получен",
            status: 200,
            data: usersList,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка получения списка пользователей на стороне сервера",
            status: 500,
        });
    }
};

export default getUsersByNameHandler;
