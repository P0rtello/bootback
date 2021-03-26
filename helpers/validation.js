 require('dotenv').config()
 let secret = process.env.SECRET;
var jwt = require('jsonwebtoken');

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};
/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

const generateUserToken = (email, username, is_admin) => {
    const token = jwt.sign({
        email :email,
        username: username,
        is_admin: is_admin
    },
        process.env.SECRET,{expiresIn: `3d`});
    return token;
};

module.exports = {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken
};
