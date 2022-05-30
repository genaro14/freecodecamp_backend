let express = require('express');
let app = express();
require('dotenv').config()
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

module.exports = app;
