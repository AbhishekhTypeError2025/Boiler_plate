const utils = {};
//function for email exist in file
utils.isEmailExists = (users, email) => {
    return users.some((it) => {
        return it.email == email;
    });
}

//function for UserId exist or not
utils.isUserIdExists = (users, userId) => {
    return users.some((it) => {
        return it.userId == userId;
    });
}

//function for 


module.exports = utils;