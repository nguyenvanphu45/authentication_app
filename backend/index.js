const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
const db = require('./src/config/db');
const route = require('./src/routes');

// Connect to db
db.connect();

// HTTP logger
// app.use(morgan('combined'));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' }));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        optionSuccessStatus: 200,
    }),
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Routes init
route(app);

const server = app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', (socket) => {
    console.log('Connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined Room: ' + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        let group = newMessageRecieved.group;

        if (!group.users) return console.log('group.users not defined');

        group.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message received', newMessageRecieved);
        });
    });

    socket.off('setup', () => {
        console.log('USER DISCONNECTED');
        socket.leave(userData._id);
    });
});
