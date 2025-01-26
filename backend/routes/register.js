const experss = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const router = experss.Router();

// import models
const User = require('../models/user');

router.post('/', async (req, res) => {

    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = new User({
        name: username,
        email: email,
        password: hashedPassword
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});

module.exports = router;