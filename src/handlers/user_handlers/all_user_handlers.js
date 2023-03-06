import loginHandler from "./login.js";
import registrationHandler from "./registration.js";
import getData from "./get_data.js";
import updateHandler from "./update.js";
import getUsersByNameHandler from "./get_users_by_name.js";

const userHandlers = {
    login: loginHandler,
    registration: registrationHandler,
    getData,
    getByName: getUsersByNameHandler,
    update: updateHandler,
};

export default userHandlers;
