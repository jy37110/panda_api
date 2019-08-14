let handler = require('./index.js');

let event = {
    "Action": "Login",
    "Data": {
        "Id" : 2,
        "Password": "123123"
    }
};
let context = {};
let callback = (data) => {
    console.log(data);
};

handler.handler(event,context,callback);