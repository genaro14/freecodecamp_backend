let express = require('express');
let app = express();
require('dotenv').config()
const indexPath = __dirname + '/views/index.html';
const publicPath = __dirname + '/public';


console.log("Hello World");
app.use("/public", express.static(publicPath));

app.get('/', function (req, res) {
    res.sendFile(indexPath)
});

console.log(process.env.MESSAGE_STYLE);
app.get('/json', function (req, res) {
    let response = {};
    const lowercase = { "message": "Hello json" };
    const uppercase = { "message": "HELLO JSON" };
    if (process.env.MESSAGE_STYLE == 'uppercase') response = uppercase
    else response = lowercase;
    res.json(response)
});




































module.exports = app;
