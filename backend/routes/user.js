const router = require('express').Router();
let User = require('../models/user.model');

router.route('/list').get((req, res) => {
    User.find().select('user_name web_site last_access date_joined')
        .then(users => { res.json(users);})
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
