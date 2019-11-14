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

//Post Request for topics taking a JSON object as a parameter
app.post('/api/topic', (req, res) => {
    let date = new Date();
    let topic = req.body.topic;

    if(topic === undefined || typeof(topic) != "string"){
        console.log("error");
        output.write('ERROR: ' + JSON.stringify(req.body) + ' is not the correct format for this post request...' + date + '\n');
        res.status(400).send('Incorrect JSON parameter');
        return;
    }
    output.write(JSON.stringify(req.body) + ' was entered as a parameter. ' + date + '\n');

    switch(topic) {
        case 'topic1':
            output.write('topic1 json object was sent to the user...' + date + '\n');
            var topic1 = require('./topic1.json');
            res.json(topic1);
            break;
        case 'topic2':
            output.write('topic2 json object was sent to the user...' + date + '\n');
            var topic2 = require('./topic2.json');
            res.json(topic2);
            break;
        case 'topic3':
            output.write('topic3 json object was sent to the user...' + date + '\n');
            var topic3 = require('./topic3.json');
            res.json(topic3);
            break;
        case 'topic4':
            output.write('topic4 json object was sent to the user...' + date + '\n');
            var topic4 = require('./topic4.json');
            res.json(topic4);
            break;
        case 'topic5':
            output.write('topic5 json object was sent to the user...' + date + '\n');
            var topic5 = require('./topic5.json');
            res.json(topic5);
            break;
        case 'topic6':
            output.write('topic6 json object was sent to the user...' + date + '\n');
            var topic6 = require('./topic6.json');
            res.json(topic6);
            break;    
        default:
            output.write('no json object was sent to the user...' + date + '\n');
            res.status(404).send("unknown topic");
            res.end();
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
    output.write(JSON.stringify(req.body) + ' was passed as a parameter...' + date + '\n');
    output.write(JSON.stringify(req.body) + ' was saved to scores.json...' + date + '\n');
    res.status(201).send(req.body);
})
.get((req,res) => {
    let date = new Date();
    const scoreJSON = require('./scores.json');
    output.write('Score JSON object was returned...' + date);
    res.json(scoreJSON);
});

//Starts server on PORT
app.listen(PORT, () => {
    let date = new Date();
    console.log(`Server started on port ${PORT}`);
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});

