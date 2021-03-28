// Load module
var mysql = require('mysql');
var express = require('express');
let user = process.env.user;
let password = process.env.pasword;

// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    port     : '3306',
    user     :  user,
    password :  password,
    database : 'bootback',
    debug    :  false
});

exports.getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            }
            resolve(connection);
        });
    });
};
