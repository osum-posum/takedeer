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
    const sqlSearchUsername = "SELECT * FROM userstable WHERE username = ?";
    const sqlSearchPassword = "SELECT * FROM userstable WHERE password = ?";
    const searchUsernameQuery = mysql.format(sqlSearchUsername, [username]);

    db.query(searchUsernameQuery, (error, result) => {
        if (error) {
            return console.log(error);
        };
        if (result.length > 0) {
            return console.log({message: "user already exists"})
        }

        if (password !== confirmPassword) {
            return console.log({message: "passwords don't match"})
        }
    });
});

app.listen(PORT, () => {
    console.log({message: "server running"});
});