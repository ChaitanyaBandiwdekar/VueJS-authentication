"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = new DB("sqlitedb")
const app = express();
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// CORS middleware
const enableCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(enableCrossDomain)


// REGISTER    @ /register

router.post('/register', function (req, res) {

    db.insert([
        // Body of the request received
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 6)
    ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // token expires in 24 hours (in seconds)
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});


// LOGIN    @ /login

router.post('/login', (req, res) => {

    // Search user by email entered in login field
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // token expires in 24 hours (in seconds)
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
});


app.use(router)

// Runs the server on the environment port (in case of deployment) or 3000 (for development)
let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server listening on port ' + port)
    }
);