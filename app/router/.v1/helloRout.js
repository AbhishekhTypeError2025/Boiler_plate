const userControllers = require("../../controller/user.controller");

module.exports = [
    {
        method: "GET",
        path: "/hello",
        handler:userControllers.hello,
    },
]
