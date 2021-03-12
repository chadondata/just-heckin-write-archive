const bcrypt = require("bcryptjs");

const hash_password = (plain_text) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plain_text, salt);
};

const validate_password = (provided, saved) => {
    return bcrypt.compareSync(provided, saved);
};

module.exports.hash_password = hash_password;
module.exports.validate_password = validate_password;
