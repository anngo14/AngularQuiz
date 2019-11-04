var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

//Write Stream
var output = fs.createWriteStream('logs/serverlog.txt', {'flags': 'a'});

//Implements Express
var app = express();

//PORT for server
const PORT = process.env.PORT || 4500;

//Looks in QuizAngular for static files
app.use(express.static(path.join(__dirname, '..', 'dist/QuizAngular')));

//Path of built Angular application
const angularEntry = path.join(__dirname, '..', 'dist/QuizAngular/index.html');

//Sends angular UI via the available routes
app.get('/login', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.get('/home', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.get('/quiz', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.post('/result', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.get('/logout', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.get('/error', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
//Catches all of the undefined routes
app.get('*', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + ' This path is undefined in this application. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});

//Creates Server that uses express
var server = http.createServer(app);

//Server is started on PORT 
server.listen(PORT, () => {
    let date = new Date();
    console.log(`Server Running on Port ${PORT}...` + date + '\n');
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});