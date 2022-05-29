let express = require('express');
let app = express();
const indexPath = __dirname + '/views/index.html';
const publicPath = __dirname + '/public';
var path = require('path');

console.log("Hello World");
app.use("/public", express.static(publicPath));
app.get('/',function(req, res){
    res.sendFile(indexPath)
});



































 module.exports = app;
