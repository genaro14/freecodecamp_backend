let express = require('express');
let app = express();
const indexPath = __dirname + '/views/index.html';
const publicPath = __dirname + '/public';
const responseJSON = { "message": "Hello json" };

console.log("Hello World");
app.use("/public", express.static(publicPath));

app.get('/', function (req, res) {
    res.sendFile(indexPath)
});

app.get('/json', function (req, res) {
    res.json(responseJSON)
});




































module.exports = app;
