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
    let topic = req.body.topic;

    console.log(req.body.topic + ' was entered as a parameter. ' + date + '\n');
    output.write(JSON.stringify(req.body) + ' was entered as a parameter. ' + date + '\n');
    //res.json(req.body);

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
            res.send("unknown topic");
            res.end();
    }
    //Logs according to incoming parameter
    if(topic != 'topic1' || topic != 'topic2' || topic != 'topic3' || topic != 'topic4' || topic != 'topic5' || topic != 'topic6'){
        output.write(topic + ' was requested from the user...This is an invalid request. ' + date + '\n');

    } else {
        output.write(topic + ' was requested from the user...' + date + '\n');
    }
});

//Starts server on PORT
app.listen(PORT, () => {
    let date = new Date();
    console.log(`Server started on port ${PORT}`);
    output.write(`Server Running on Port ${PORT}...` + date + '\n');
});

