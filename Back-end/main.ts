var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var crudHandler = require('./operation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', async function (req, res) {
    crudHandler('VIEWALL')
        .then(
            response => {
                console.log(response);
                res.send(response);
            }
        );
});

app.get('/view/:id', function (req, res) {
    crudHandler('VIEWALL')
        .then(
            response => {
                console.log(response);
                res.send(response);
            }
        );
})

app.post('/add', function (req, res) {
    crudHandler('CREATE', req.body)
        .then(
            response => {
                res.send(response);
            }
        );
});

app.get('/search/:id', function (req, res) {
    crudHandler('SEARCH', { id: req.params.id })
        .then(
            response => {
                res.send(response);
            }
        );
});

app.post('/update', function (req, res) {
    crudHandler('UPDATE', req.body)
        .then(
            response => {
                res.send(response);
            },
            err => {
                res.send('Error Occurred');
            }
        );
});

app.get('/delete/:id', function (req, res) {
    crudHandler('DELETE', { id: req.params.id })
        .then(
            response => {
                res.send(response);
            },
            err => {
                res.send('Error Occurred');
            }
        );
});

app.listen(3000, function () {
    console.log('Application is running on 3000 port.');
})