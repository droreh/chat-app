const express = require('express');
const router = express.Router();
const User = require('./User');

const PASSWORD_MAX_LEN = 20;
const PASSWORD_MIN_LEN = 8;
const USERNAME_MAX_LEN = 16;
const USERNAME_MIN_LEN = 3;

async function usernameIsTaken(username) {
    return await User.findOne({username}) != null;
}
async function emailIsTaken(email) {
    return await User.findOne({email}) != null;
}
function emailIsValid(email) {
    return new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$").test(email);
}
function passwordIsTooLong(password) {
    return password.length > PASSWORD_MAX_LEN;
}
function passwordIsTooShort(password) {
    return password.length < PASSWORD_MIN_LEN;
}
function passwordIsValid(password) {
    return new RegExp("^[a-zA-Z0-9_]*$").test(password);
}
function usernameIsTooLong(username) {
    return username.length > USERNAME_MAX_LEN;
}
function usernameIsTooShort(username) {
    return username.length < USERNAME_MIN_LEN;
}
function usernameIsValid(username) {
    return new RegExp("^[a-zA-Z0-9_]*$").test(username);
}

async function checkUser(user) {
    let errors = [];
    if (await usernameIsTaken(user.username)) errors.push("Username is taken");
    if (await emailIsTaken(user.email)) errors.push("Email is taken");
    if (!emailIsValid(user.email)) errors.push("Email is invalid");
    if (passwordIsTooLong(user.password)) errors.push("password is too long");
    if (passwordIsTooShort(user.password)) errors.push("password is too short");
    if (!passwordIsValid(user.password)) errors.push("password is invalid");
    if (usernameIsTooShort(user.username)) errors.push("username is too long");
    if (usernameIsTooLong(user.username)) errors.push("username is too long");
    if (!usernameIsValid(user.username)) errors.push("username is invalid");
    return errors;
}


router.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let user = { username, password, email };
    let errors = await checkUser(user);

    if (errors.length != 0) {
         res.json({errors});
    }
    else {
        user.date = new Date();
        user.friends = [];
        user = new User(user);
    const savedUser = await user.save();
    res.json(savedUser);
}
});

module.exports = router;