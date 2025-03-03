const express = require('express');
const app=express()

const serverStart=new Promise(async(resolve, reject) => {
    await require('./app/startup/expressStartup')(app);
    resolve("route is connected");
})

serverStart.then((result) => {
    console.log(result);
    app.listen(5050, () => {
        console.log(`Server Running on http://localhost:5050`);
    })
}).catch((err) => {
    console.log(err.message);
})
