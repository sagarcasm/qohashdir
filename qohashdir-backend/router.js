const express = require('express');

const config = require('./config');


const router = new express.Router();

//imports
const directoryFunctions = require('./routes/directory/directoryRouter');

//additonal routes
router.use(directoryFunctions());

// router.use(require('./routes/proxy/router'));

module.exports = router;
