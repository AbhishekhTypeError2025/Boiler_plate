const joi = require('joi');
const userControllers = require('../../controller/user.controller');


module.exports = [
    {
        method: "POST",
        path: "/register",
        joiSchema: {
            body: joi.object({
                name: joi.string().min(3).required(),
                email: joi.string().email().required(),
                password: joi.string().min(6).required(),
                userId:joi.string().required(),
            }),
        },
        handler: userControllers.registerUser,
    },
    {
        method: "GET",
        path: "/getProfile",
        handler: userControllers.getProfileDetails,
    },
    {
        method: "POST",
        path: "/login",
        joiSchema: {
            body: joi.object({
                email: joi.string().email().required(),
                password: joi.string().min(6).required(),
            }),
        },
        handler:userControllers.login,
    }
]