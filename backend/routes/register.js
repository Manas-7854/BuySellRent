const experss = require('express');
const router = experss.Router();

// import models
const User = require('../models/user');

router.post('/', (req, res) => {

    const { username, password, email } = req.body;
    
    console.log("name:", username);
    console.log("email:", email);
    console.log("password:", password);

    const user = new User({
        name: username,
        email: email,
        password: password
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

    

    // check if the user already exists in not the save else return error


});

module.exports = router;