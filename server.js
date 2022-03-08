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
// Use urlencoded middleware to parse the posted <form> data to js object data, which is available as req.body
app.use(express.urlencoded({ force: true }));

// Add GET / route to return index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Add POST route
app.post('/api/ski_resorts', async(req, res, next) => {
    try {
        // Create a random new item using "curl localhost:3000/api/ski_resorts/ -X POST" in terminal
        /* const randomResort = await SkiResorts.create({
            name: "test",
            location: "test",
            hours: "unknown",
            ticket: "unknown",
            lesson: "unknown",
            website: "unknown"
        }) */

        // Create an new item using html <form>
        // console.log(req.body);
        const { name, location, website, hours, ticket, lesson } = req.body;
        const newResort = await SkiResorts.create({
            name, location, website, hours, ticket, lesson
        })
        // res.redirect(`/api/ski_resorts/${newResort.id}`);
        // res.redirect('/');
        res.status(201).send(newResort);
    }
    catch (err) {
        next(err);
    }
});

// Add Delete route
app.delete('/api/ski_resorts/:id', async(req, res, next) => {
    try {
        const resort = await SkiResorts.findByPk(req.params.id);
        await resort.destroy();
        res.sendStatus(204);
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