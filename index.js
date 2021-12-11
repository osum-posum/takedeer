// TODO: it is not detecting req.session.user for the log in state

// Server Variables 
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

// Password Variables
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const  PORT = 3001;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));

const sessionOptions = {
    key: 'userId',
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expries: 60 * 60 * 24,
    },
}

app.use(session(sessionOptions));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users',
});

app.post('/create', (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const sqlSearch = "SELECT * FROM userstable WHERE username = ?";
    const sqlInsert = "INSERT INTO userstable (username, password) VALUES (?, ?)";
    const searchQuery = mysql.format(sqlSearch, [username]);
    const insertQuery = mysql.format(sqlInsert, [username, password]);

    db.query(searchQuery, async(error, result) => {
        if (error) {
            return console.log(error);
        };

        if (result.length > 0) {
            return console.log({message: "user already exists"});
        };

        if (password !== confirmPassword) {
            return console.log({message: "passwords don't match"});
        };

        let hashedPassword = await bcrypt.hash(password, 10);

        db.query(insertQuery, (error, result) => {
            if (error){
                console.log(error)
            } else {
                return res.render('register', {message: 'user created'})
            };
        });
    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        res.send('need token')
    } else {
        jwt.verify(token, 'mySecret', (error, decoded) => {
            if (error) {
                res.json({auth: false, message: 'failed to authorize'})
            } else {
                req.userId = decoded.id;
                next()
            };
        });
    };
};


app.get('authentication', verifyJWT, (req, res) => {
    res.send('you are authorized')
});

app.get('/login', (req, res) => {
    console.log(req.session.user)
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        console.log({message: 'logged in = true'})
    } else {
        res.send({ loggedIn: false });
        console.log({message: 'logged in = false'})
    }
});

app.post('/login:id', (req, res) => {
    const { username, password } = req.body;
    const sqlSearch = "SELECT * FROM userstable WHERE username = ?";
    const searchQuery = mysql.format(sqlSearch, [username]);

    db.query(searchQuery, (error, result) => {
        if (error) {
           return console.log(error);
        };

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    const id = result[0].id;
                    const token = jwt.sign({id}, 'mySecret', {
                        expiresIn: 300,
                    });
                    req.session.user = result;
                    console.log(req.session.user)
                    res.send(result);

                    res.json({auth: true, token: token, result: result});
                    console.log(result)
                }
            });
            res.send(result);
        } else {
            res.send({message: 'wrong user'})
        };
    });
});

app.listen(PORT, () => {
    console.log({message: 'server running'});
});