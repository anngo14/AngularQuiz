var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');

//Allows for localhost:4500 to access this service
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4500',
    optionsSuccessStatus: 200
};

//Write stream
var output = fs.createWriteStream('logs/apilog.txt', {'flags' : 'a'});

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
/* THIS IS A TEST FOR POST NEEDS TO BE CHANGED FOR ENTERING TOPIC NAME AND RETURNING TOPIC.JSON */
app.post('/api/topic', (req, res) => {
    let date = new Date();
    console.log(JSON.stringify(req.body) + ' was entered as a parameter. ' + date + '\n');
    output.write(JSON.stringify(req.body) + ' was entered as a parameter. ' + date + '\n');
    res.json(req.body);
});
//Get Request for each topic
app.get('/api/topics/:name', (req, res) => {
    const reqName = req.param('name');
    let date = new Date();
    switch(reqName) {
        case 'topic1':
            var topic1 = require('../json objects/topic1.json');
            res.json(topic1);
            break;
        case 'topic2':
            var topic2 = require('../json objects/topic2.json');
            res.json(topic2);
            break;
        case 'topic3':
            var topic3 = require('../json objects/topic3.json');
            res.json(topic3);
            break;
        case 'topic4':
            var topic4 = require('../json objects/topic4.json');
            res.json(topic4);
            break;
        case 'topic5':
            var topic5 = require('../json objects/topic5.json');
            res.json(topic5);
            break;
        default:
            res.send("unknown topic");
            res.end();
    }
    //Logs according to incoming parameter
    if(reqName != 'topic1' || reqName != 'topic2' || reqName != 'topic3' || reqName != 'topic4' || reqName != 'topic5'){
        output.write(reqName + ' was requested from the user...This is an invalid request. ' + date + '\n');

    } else {
        output.write(reqName + ' was requested from the user...' + date + '\n');
    }
});

//Starts server on PORT
app.listen(PORT, () => {
    let date = new Date();
    console.log(`Server started on port ${PORT}`);
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});

