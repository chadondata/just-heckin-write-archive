const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_schema = new Schema({
    user_name : {
        type : String
        , required : true
        , unique : true
        , minlength : 3
        , maxlength : 50
        , trim : true
    },
    email_address : {
        type : String
        , required : true
        , unique : true
        , minlength : 6
        , maxlength : 255
        , trim : true
    },
    password : {
        type : String
        , required : true
        , minlength : 6
        , maxlength : 1024
        , trim : true
    },
    about_me : {
        type : String
        , maxlength : 1024
    },
    web_site : {
        type : String
        , maxlength : 1024
    },
    last_access : {
        type : Date
        , default : Date.now
    },
    date_joined : {
        type : Date
        , default : Date.now
    },
    profile_image : {
        data : Buffer
        , contentType : String
    },
    email_confirmation_code : {
        type : String
        , required : true
        , minlength : 3
        , maxlength : 1024
        , trim : true
    },
    email_confirmation_date : {
        type : Date
    },
    private : {
        type: Boolean
    }
}, {
    timestamps : true
});

const User = mongoose.model('user', user_schema);

module.exports = User;