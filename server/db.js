"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    // CREATES TABLE IF NOT ALREADY EXISTS
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS userAuth (
                id integer PRIMARY KEY, 
                name text, 
                email text UNIQUE, 
                password text)`
        return this.db.run(sql);
    }

    // SEARCHES USER BY EMAIL
    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM userAuth WHERE email = ?`,
            [email], function (err, row) {
                callback(err, row)
            })
    }

    // INSERTS USER INTO DB TABLE
    insert(user, callback) {
        return this.db.run(
            'INSERT INTO userAuth (name,email,password) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db