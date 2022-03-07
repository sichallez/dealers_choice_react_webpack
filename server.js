const { syncAndSeed, SkiResorts } = require('./db');

// Require express module to create the app on the server side
const express = require('express');
const app = express();

// Add a GET API route
app.get('/api/ski_resorts', async(req, res, next) => {
    try {
        const resorts = await SkiResorts.findAll();
        res.send(resorts);
    }
    catch (err) {
        next(err);
    }
});

// Add GET API individual item route
app.get('/api/ski_resorts/:id', async(req, res, next) => {
    try {
        const resort = await SkiResorts.findByPk(req.params.id);
        res.send(resort);
    }
    catch (err) {
        next(err);
    }
});

// Require the path module
const path = require('path');
// Add a static route for webpack generated file ./dist/main.js
app.use('/dist', express.static(path.join(__dirname, '/dist')));

// Add GET / route to return index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Add POST route
app.post('/api/ski_resorts', async(req, res, next) => {
    try {
        const randomResort = await SkiResorts.create({
            name: "test",
            location: "test",
            hours: "unknown",
            ticket: "unknown",
            lesson: "unknown",
            website: "unknown"
        })
    }
    catch (err) {
        next(err);
    }
});



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