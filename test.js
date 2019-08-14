let handler = require('./index.js');

// let event = {
//     "Action": "Login",
//     "Data": {
//         "Id" : 2,
//         "Password": "123123"
//     }
// };

// let event = {
//     "Action": "Create User",
//     "Data": {
//         "Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJOIjoiMiJ9LCJuYW1lIjp7IlMiOiJwYW5kYSJ9LCJpYXQiOjE1NjU3NDM0NTgsImV4cCI6MTU2ODMzNTQ1OH0.HI1ytwVIh6JaWeT_h0HHvc_N27RF7r_xtKo9nZQlv-s',
//
//     }
// };

let event = {
    "Action": "Create Invoice",
    "Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJOIjoiMiJ9LCJuYW1lIjp7IlMiOiJwYW5kYSJ9LCJpYXQiOjE1NjU3NDM0NTgsImV4cCI6MTU2ODMzNTQ1OH0.HI1ytwVIh6JaWeT_h0HHvc_N27RF7r_xtKo9nZQlv-s',
    "Data": {
        "amountByDay": 20,
        "category": "category",
        "duration": "monthly",
        "happenedAt": "2019-08-09",
        "name": "Name",
        "totalAmount": 300,
    }
};
let context = {};
let callback = (data) => {
    console.log(data);
};

handler.handler(event,context,callback);