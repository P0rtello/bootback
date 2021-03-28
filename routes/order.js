var express = require('express');
var router = express.Router();
var mysql = require('../db/config');
var verifyAuth = require('../middelwares/verifyAuth')

router.post('/create', verifyAuth.verifyToken,async (req, res, next)=>{
    console.log(req.body);

    if(!req.body){
        return res.status(400).json({error:"Missing arguments."})
    }


    const connection = await mysql.getConnection();
    let orderId = generateOrderId();
    let paid = 1;
    let sql = `INSERT INTO bootback.order (order_id, email, name, paid) values ('${orderId}', '${req.user.email}', '${req.user.username}', ${paid});`
    orderProductsInsertQuery(req.body, orderId);


    connection.query(sql, (err, result) => {
        connection.release();
        if (err) {
            console.log(err);
            return res.status(501).json({ message: 'Error creating order.' })
        }
    });



});

async function orderProductsInsertQuery(orderProducts, orderId) {
    const connection2 = await mysql.getConnection();
    let query = "";
    orderProducts.forEach(orderItem => {
        query = `INSERT INTO bootback.order_product (order_id, product_id, amount) values ('${orderId}', '${orderItem.product.id}', '${orderItem.amount}');`
        connection2.query(query, (err, result) => {

            if (err) {
                console.log(err);
                return res.status(501).json({message: 'Error creating order.'})
            }
        });
    });
    connection2.release();
    return query;
}

function validateOrders(orders) {
    return new Promise((resolve, reject) => {
        orders.forEach((order) => {
            if (!order.productId) reject('Wrong order format.');
            if (order.quantity < 1) reject('Quantity needs to be at least 1.')
        });
        resolve(true);
    })
}

function generateOrderId() {
    let S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}
module.exports = router;
