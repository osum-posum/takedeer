const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const  PORT = 3001;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users',
});

app.post('/create', (request, response) => {
    const { username, password, confirmPassword } = request.body;
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

app.post('/login', (request, response) => {
    const { username, password } = request.body;
    const sqlSearch = "SELECT * FROM userstable WHERE username = ? AND password = ?";
    const searchQuery = mysql.format(sqlSearch, [username, password]);

    db.query(searchQuery, (error, result) => {
        if (error) {
           return console.log(error)
        };

        if (result.length > 0) {
            response.send(result);
        } else {
            console.log({message: 'wrong user'})
        }
    });
});

app.listen(PORT, () => {
    console.log({message: 'server running'});
});