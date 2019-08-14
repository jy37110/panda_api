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
//     }
// };

// let event = {
//     "Action": "Create Invoice",
//     "Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJTIjoiMiJ9LCJuYW1lIjp7IlMiOiJQYW5kYSJ9LCJpYXQiOjE1NjU3NTk4NzcsImV4cCI6MTU2ODM1MTg3N30.QxVSJnNuw9BWmOw4vJ-NfzVE7zWPjneQSgfYmBCwR4U',
//     "Data": {
//         "amountByDay": 40,
//         "category": "category",
//         "duration": "monthly",
//         "happenedAt": "2019-08-09",
//         "name": "Name",
//         "totalAmount": 500,
//     }
// };

// let event = {
//     "Action": "Delete Invoice",
//     "Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJOIjoiMiJ9LCJuYW1lIjp7IlMiOiJwYW5kYSJ9LCJpYXQiOjE1NjU3NDM0NTgsImV4cCI6MTU2ODMzNTQ1OH0.HI1ytwVIh6JaWeT_h0HHvc_N27RF7r_xtKo9nZQlv-s',
//     "Data": {
//         "invoiceId": '7f365cf0-be49-11e9-8353-5f92b04a6800',
//     }
// };

let event = {
    "Action": "Get Invoices",
    "Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJTIjoiMiJ9LCJuYW1lIjp7IlMiOiJQYW5kYSJ9LCJpYXQiOjE1NjU3NTk4NzcsImV4cCI6MTU2ODM1MTg3N30.QxVSJnNuw9BWmOw4vJ-NfzVE7zWPjneQSgfYmBCwR4U',
    "Data": {
    }
};


let context = {};
let callback = (data) => {
    console.log(data);
};

handler.handler(event,context,callback);