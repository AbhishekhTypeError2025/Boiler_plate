const files = {};
const fs = require('fs');
//read content from file

files.fileRead = (file, defaultData = []) => {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').trim() === '') {
        fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
    }
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

//write content in file

files.fileWrite = (file, content) => {
    fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

module.exports = files;