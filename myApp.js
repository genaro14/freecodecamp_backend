let express = require('express');
let app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const indexPath = __dirname + '/views/index.html';
const publicPath = __dirname + '/public';

app.use(function(req, res, next) {
    const response = req.method + ' ' + req.path + ' - ' + req.ip
    console.log(response);
    next();
});

app.get('/', function (req, res) {
    res.sendFile(indexPath)
});


app.use("/public", express.static(publicPath));

app.get('/json', function (req, res) {
    let response = {};
    const lowercase = { "message": "Hello json" };
    const uppercase = { "message": "HELLO JSON" };
    if (process.env.MESSAGE_STYLE === "uppercase") response = uppercase
    else response = lowercase;
    res.json(response)
});

const handler = (req, res, next) => {
    req.time = new Date().toString();
    next();
}
app.get('/now', handler,(req, res) => {
    res.send({time: req.time })
})
app.get('/:word/echo', (req, res) => {
        res.send({ 'echo': req.params.word })
});
app.get('/name', (req, res,next) => {
    const response = { name: req.query.first + ' ' + req.query.last } 
    res.send(response);
    // next();
});
app.post('/name', (req, res,next) => {
    const response = { name: req.query.first + ' ' + req.query.last } 
    res.send(response);
    // next();
});


module.exports = app;
