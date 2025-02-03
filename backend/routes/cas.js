// Required Modules
const express = require("express");
let CASAuthentication = require('cas-authentication');
let session = require("express-session");


// Router
const router = express.Router()

// import models
const User = require("../models/user");

// CAS Authentication
const cas = new CASAuthentication({
    cas_url: 'https://login.iiit.ac.in/cas',
    service_url: 'http://localhost:4000', // backend url
});



module.exports = router;