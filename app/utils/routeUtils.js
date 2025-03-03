
const routeUtils = {};


routeUtils.route = async(app, routes) => {
    routes.forEach((route) => {
        const middlewares = [];
        middlewares.push(vaildateJoiSchema(route));
        app.route(route.path)[route.method.toLowerCase()](...middlewares,getHandlerMethod(route));

        //app.route("/users").get(authMiddleware, (req, res) => res.send("User List"));

    });
}

const checkJoiValidation = (schema, payload, res) => {
    const { error, value } = schema.validate(payload);

    if (error) {
        console.log(JSON.stringify(error));
        throw res.status(400).json({ "Error": error.message });
    }
    return value;
}

const vaildateJoiSchema = (route) => (req, res, next) => {
    if (route.joiSchema.body && Object.keys((route.joiSchema.body || {}))?.length) {
        req.body = checkJoiValidation(route.joiSchema.body, req.body, res);
    }
    if (route.joiSchema.params && Object.keys((route.joiSchema.params || {}))?.length) {
        req.params = checkJoiValidation(route.joiSchema.params, req.params, res);
    }
    if (route.joiSchema.query && Object.keys((route.joiSchema.query || {}))?.length) {
        req.query = checkJoiValidation(route.joiSchema.query, req.query, res);
    }

    next();
}


const getHandlerMethod = (route) => {
    const { handler } = route;

    return (req, res) => {

        const payload = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {}),
        };

        handler(payload).then((result) => {
            res.status(result.statusCode).json({ msg: result.message });
        }).catch((err) => {
            console.log('Error is ', err);
            res.status(err.statusCode).json(err);
        })
    }
}

module.exports = routeUtils;