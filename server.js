const { syncAndSeed, SkiResorts } = require('./db');

// Require express module to create the app on the server side
const express = require('express');
const app = express();

// DataBase initialization and seeding the data
const init = async() => {
    try {
        await syncAndSeed();
        
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listen on the port ${port} ...`));
    }
    catch (err) {
        console.log(err);
    }
};

init();