let handler = require('./index.js');

let event = {
    "Type": "Login",
    "Data": {
        "Id" : 2,
        "Password": "123123"
    }
};
let context = {};
let callback = (data, ss) => {
    console.log(data);
};

handler.handler(event,context,callback);