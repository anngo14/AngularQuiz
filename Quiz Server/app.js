var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyparser = require('body-parser');
var https = require('https');
var axios = require('axios');

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
app.use(express.json());
app.use(bodyparser.json());

//PORT for server
const PORT = process.env.PORT || 4500;

//Looks in QuizAngular for static files
app.use(express.static(path.join(__dirname, '..', 'dist/QuizAngular')));

//Path of built Angular application
const angularEntry = path.join(__dirname, '..', 'dist/QuizAngular/index.html');

//Get Request for all users [Get endpoint1]
app.route('/users').get((req, res) => {
    let date = new Date();
    let user = req.query.user;
    let pass = req.query.pass;
    let index = checkUser(user, pass);
    if(index != -1){
        res.json({'status': 'success'});
        output.write('User successfully logged in. ' + date + '\n');
    }
    else{
        res.json({'status': 'fail'});
        output.write('User failed to log in. ' + date + '\n');
    }
    output.write('User get request. ' + date + '\n');
});
//Returns the index of user in a list of users
function checkUser(user, pass){
    var users = require('./users.json');
    let userlist = users.users;

    let index = -1;
    for(let i = 0; i < userlist.length; i++){
      if(userlist[i].username === user && userlist[i].password === pass){
        index = i;
      }
    }
    return index;
}
//Checks topic [Get endpoint 2] 
app.get('/topic', (req, res) => {
    let user = req.query.user;
    let topic = req.query.topic;
    let date = new Date();

    let postJSON = {
        topic: topic
    };

    if(topic === "topic1" || topic === "topic2" || topic === "topic3" || topic === "topic4" || topic === "topic5" || topic === "topic6"){
        output.write(topic + ` was requested from ${user}...` + date + '\n');
        axios.post('http://localhost:5000/api/topic', postJSON,
           { headers: { 'Content-Type': 'application/json' }})
          .then(function (response) {
            res.json(response.data);
          })
          .catch(function (error) {
            output.write("ERROR: " + error + '\n');
          });
    }else{
        output.write(topic + ` was requested from ${user}...This is an invalid request. ` + date + '\n');
        res.json({'status': 'not found'});
    }
});
//Sends message Post Endpoint3
app.post('/complete', (req, res) => {
    let date = new Date();
    output.write('Quiz has been completed and scored...' + date + '\n');
    res.status(200).send({'message': 'Your quiz has been completed, thanks!'});
});

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
app.get('/result', (req, res) => {
    let urlPath = req.url;
    let date = new Date();
    let log = 'Path changed to ' + urlPath + '. ' + date + '\n';
    output.write(log);
    res.sendFile(angularEntry);
});
app.get('/thankyou', (req, res) => {
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