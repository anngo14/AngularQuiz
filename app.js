var express = require('express');
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));

//Environment PORT
const PORT = process.env.PORT || 5000;
//Starts server on PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Get Request for all users
app.route('/api/users').get((req, res) => {
    var users = require('./src/app/json objects/users.json');
    res.json(users);
});
//Get Request for each topic
app.route('/api/topics/:name').get((req, res) => {
    const reqName = req.param('name');
    switch(reqName) {
        case 'topic1':
            var topic1 = require('./src/app/json objects/topic1.json');
            res.json(topic1);
            break;
        case 'topic2':
            var topic2 = require('./src/app/json objects/topic2.json');
            res.json(topic2);
            break;
        case 'topic3':
            var topic3 = require('./src/app/json objects/topic3.json');
            res.json(topic3);
            break;
        case 'topic4':
            var topic4 = require('./src/app/json objects/topic4.json');
            res.json(topic4);
            break;
        case 'topic5':
            var topic5 = require('./src/app/json objects/topic5.json');
            res.json(topic5);
            break;
        default:
            res.send("unknown topic");
    }
    console.log(reqName);
});

console.log("Hello from Node");