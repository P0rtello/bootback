var express = require('express');
var router = express.Router();
var mysql = require('../db/config');
var verifyAuth = require('../middelwares/verifyAuth')

router.post('/create', async (req, res) => {

    const connection = await mysql.getConnection();

    const sql = `INSERT INTO products (name, cat, img, price, lengte, descr, descr2, descr3) values ('${req.body.name}', '${req.body.category}', '${req.body.img}', '${req.body.price}', '${req.body.lengte}', '${req.body.desc}', '${req.body.desc2}', '${req.body.desc3}')`;
    connection.query(sql, (err, result) => {
        connection.release();
        if (err) {
            console.log(err);
            return res.status(501).json({ message: 'Error creating product.' })
        }
        return res.status(200).json(result);
    });

});

router.get('/load', async (req, res) =>{

    const connection = await mysql.getConnection();

    const sql = 'SELECT * FROM products';

    connection.query(sql, (err, result) => {
        connection.release();
        if (err) {
            console.log(err);
            return res.status(501).json({ message: 'Error loading products.' })
        }
        return res.status(200).json(result);
    });

});

module.exports = router;
