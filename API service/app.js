var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');

//Allows for localhost:4500 to access this service
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4500',
    optionsSuccessStatus: 200
};

//Write Stream	
var output = fs.createWriteStream('logs/apilog.txt', {'flags': 'a'});	

//File Stats	
fs.stat('logs/apilog.txt', function (err, stats) {	
    if (err) throw err;	
    //Get the file size	
    var fileSize = stats.size;	
    console.log(fileSize + ' bytes');	
    output.write('Size of apilog.txt is ' + fileSize + ' bytes\n');
    //If file size exceeds 1 MB, move the contents to a backup log	
    if(fileSize > 1000000) {	   
        //Streams for src and dst log files
        let src = fs.createReadStream('logs/apilog.txt');
        let dst = fs.createWriteStream('logs/backup/apilog-backup.txt', {'flags':'a'});
        //Backup data in apilog.txt to apilog-backup.txt
        let date = new Date();
        output.write('Data Backed up...' + date + '\n');
        src.pipe(dst);   

        //Clean up of original src log file     
        dst.on("close", () => {
            let clean = fs.createWriteStream('logs/apilog.txt');
            clean.write('');
        });
    }	
});

//Environment PORT
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyparser.json());

//Get Request for all users
app.route('/api/users').get((req, res) => {
    let date = new Date();
    var users = require('./users.json');
    res.json(users);
    output.write('Users JSON object was returned. ' + date + '\n');
});

//Post Request for topics taking a JSON object as a parameter
app.post('/api/topic', (req, res) => {
    let date = new Date();
    let topic = req.body.topic;
    output.write(JSON.stringify(req.body) + ' was entered as a parameter. ' + date + '\n');

    switch(topic) {
        case 'topic1':
            var topic1 = require('./topic1.json');
            res.json(topic1);
            break;
        case 'topic2':
            var topic2 = require('./topic2.json');
            res.json(topic2);
            break;
        case 'topic3':
            var topic3 = require('./topic3.json');
            res.json(topic3);
            break;
        case 'topic4':
            var topic4 = require('./topic4.json');
            res.json(topic4);
            break;
        case 'topic5':
            var topic5 = require('./topic5.json');
            res.json(topic5);
            break;
        case 'topic6':
            var topic6 = require('./topic6.json');
            res.json(topic6);
            break;    
        default:
            res.status(404).send("unknown topic");
            res.end();
    }
    //Logs according to incoming parameter
   
    if(topic === "topic1" || topic === "topic2" || topic === "topic3" || topic === "topic4" || topic === "topic5" || topic === "topic6"){
        output.write(topic + ' was requested from the user...' + date + '\n');
        console.log(topic + ' was requested from the user...' + date + '\n');
    }else{
        output.write(topic + ' was requested from the user...This is an invalid request. ' + date + '\n');
        console.log(topic + ' was requested from the user...This is an invalid request. ' + date + '\n');
    }
});

//Post New Score JSON
app.route('/api/score')
 .post((req, res) => {
    let date = new Date();
    const scoreOutput = fs.createWriteStream('API service/scores.json');
    
    if(req.body.correct === undefined || req.body.incorrect === undefined || typeof(req.body.correct) != "number" || typeof(req.body.incorrect) != "number"){
        console.log("error");
        output.write('ERROR: ' + JSON.stringify(req.body) + ' is not the correct format for this post request...' + date + '\n');
        res.status(400).send('Incorrect JSON parameter');
        return;
    }

    scoreOutput.write(JSON.stringify(req.body));
    output.write(JSON.stringify(req.body) + ' was passed as a parameter...' + date);
    res.status(201).send(req.body);
});

//Starts server on PORT
app.listen(PORT, () => {
    let date = new Date();
    console.log(`Server started on port ${PORT}`);
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});

