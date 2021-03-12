const joi = require('@hapi/joi');

const new_user_validation = (user_data) => {
    const schema = joi.object({
        user_name : joi.string().max(50).min(3).required()
        , email_address : joi.string().required().email()
        , password : joi.string().min(6).required()
        , repeat_password : joi.ref('password')
    }).with('password', 'repeat_password');

    return schema.validate(user_data);
};

const login_validation = (user_data) => {
    const schema = joi.object({
        email_address : joi.string().required().email()
        , password : joi.string().min(6).required()
    });
    return schema.validate(user_data);
};

module.exports.new_user_validation = new_user_validation;
module.exports.login_validation = login_validation;



