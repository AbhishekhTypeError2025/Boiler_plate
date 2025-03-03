const bcrypt = require('bcrypt');

const hashServices = {};

hashServices.hash = (password) => {
    return bcrypt.hashSync(password, 10);
}

hashServices.compare = (password,hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = hashServices;