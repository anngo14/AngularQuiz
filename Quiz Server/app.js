var express = require('express');
var path = require('path');
var fs = require('fs');

//Write Stream
var output = fs.createWriteStream('logs/serverlog.txt', {'flags': 'a'});

//File Stats
fs.stat('logs/serverlog.txt', function (err, stats) {
    if (err) throw err;
    //Get the file size
    var fileSize = stats.size;
    console.log(fileSize + ' bytes');
    output.write('Size of serverlog.txt is ' + fileSize + ' bytes\n');
    //If file size exceeds 1 MB, move the contents to a backup log
    if(fileSize > 1000000) {
        //Streams for src and dst log files
        let src = fs.createReadStream('logs/serverlog.txt');
        let dst = fs.createWriteStream('logs/backup/serverlog-backup.txt', {'flags':'a'});
        //Backup data in apilog.txt to apilog-backup.txt
        let date = new Date();
        output.write('Data Backed up...' + date + '\n');
        src.pipe(dst);   

        //Clean up of original src log file     
        dst.on("close", () => {
            let clean = fs.createWriteStream('logs/serverlog.txt');
            clean.write('');
        });
    }
});

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
app.post('/thankyou', (req, res) => {
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

//Server is started on PORT 
app.listen(PORT, () => {
    let date = new Date();
    console.log(`Server Running on Port ${PORT}...` + date + '\n');
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});