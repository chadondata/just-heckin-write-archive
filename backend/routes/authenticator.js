const router = require("express").Router();
const { new_user_validation, login_validation } = require("../utils/validation");
const { hash_password, validate_password } = require("../utils/security");

let User = require('../models/user.model');

router.post('/register', (req, res) => {
    const { error, valid } = new_user_validation(req.body);
    if(error) return res.status(400).json(`Error: ${error}`);
    
    email_conf = '123'

    const new_user = new User({
        user_name : req.body.user_name
        , email_address : req.body.email_address
        , password : hash_password(req.body.password)
        , email_confirmation_code : email_conf
    })

    new_user.save()
        .then(() => res.json(new_user))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/login', (req, res) => {
    const { error, valid } = login_validation(req.body);
    if(error) return res.status(400).json(`Error: ${error}`);

    User.findOne({ email_address : req.body.email_address })
        .then((user) => {
            if(!user) return res.json('Login error');
            const valid_password = validate_password(req.body.password, user.password);
            if(!valid_password) return res.json('Login error');

            res.json('Logged in!');
        })
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/logout', (req, res) => {
    res.json('Logout');
});

router.post('/change_password', (req, res) => {
    res.json('Change Password');
});

module.exports = router;
