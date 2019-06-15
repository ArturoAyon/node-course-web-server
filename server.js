const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `date: ${now} ${req.method} ${req.url}`;
    console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log(`Unable to append to server.log.`);
        }
    });
    next();
});

/*app.use((Req, res, next) => {
    res.render('maintenance.hbs');
});
*/

//app.use(express.static(__dirname + '/public'));
//With this, you can 
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



app.get('/', (req, res) => {
    res.send({
        name: 'Arturo',
        likes: [
            'Movies',
            'books'
        ]
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome!',
        welcomeMessage: 'Welcome to my webpage!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page!',
        welcomeMessage: 'Created by Arturo Ayon'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Welcome!',
        welcomeMessage: 'Welcome to our projects!'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
