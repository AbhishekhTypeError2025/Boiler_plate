const { createSuccessResponseWithStatus, createFailResponse } = require("../helper");
const {  fileRead, fileWrite } = require("../services/fileServices");
const utils = require("../utils/utils");
const express = require('express');
const router = express.Router();
const message = require('./../utils/message');
const path = require('path');
const hashServices = require("../services/hashServices");


const userFile = path.join(__dirname, './../model', 'users.txt');

router.use(express.json());

const userControllers = {};

userControllers.hello = async (payloads) => {

    const result = createSuccessResponseWithStatus(message.HELLO);
    return result;
}

userControllers.registerUser = async(payload) => {
    const users = fileRead(userFile);

    if (utils.isEmailExists(users, payload.email)) {
        return createFailResponse(message.EMAIL_ALREADY_EXISTS,"BAD_REQUEST");
    }

    if (utils.isUserIdExists(users, payload.userId)) {
        return createFailResponse(message.USERID_ALREADY_EXISTS, "BAD_REQUEST");
    }

    const data = {
        name:payload.name,
        email: payload.email,
        password:hashServices.hash(payload.password),
        userId: payload.userId,
        role: "student",
    }

    users.push(data);

    fileWrite(userFile, users);

    const result = createSuccessResponseWithStatus(message.USER_REGISTERED, payload);
    return result;
}

userControllers.login = async (payload) => {
    const users = fileRead(userFile);

    const index = findUserById(users, payload.email, hashServices.compare (payload.password));
    
    if (index === -1) {
        return createFailResponse(message.USER_NOT_REGISTERED, "DATA_NOT_FOUND");
    }

}

userControllers.getProfileDetails = async (payload) => {
    
}

module.exports = userControllers;