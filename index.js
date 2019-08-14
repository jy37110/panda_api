const credential = require('./credential.js');
const AWS = credential.updateCredential();
const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

exports.handler = (event, context, callback) => {
    if(event.hasOwnProperty('Action')){
        switch (event.Action) {
            case "Login":
                loginHandler(event, callback);
                break;
            case "Create User":
                createUserHandler(event, callback);
                break;
            case "Create Invoice":
                createInvoiceHandler(event, callback);
                break;
            default:
                invalidInputHandler(callback);
        }
    } else {
        invalidInputHandler(callback);
    }
};

const loginHandler = (inputObj, callback) => {
    let userId = inputObj.Data.Id.toString();
    let password = inputObj.Data.Password;
    if(userId === undefined || password === undefined){
        invalidInputHandler(callback);
    } else {
        let params = {
            TableName: 'panda_user',
            Key: {
                'user_id': {S: userId}
            }
        };
        db.getItem(params, function(err, data){
            if(err){
                callback({IsSuccess: false, ErrorMessage: err});
            } else {
                if(data.Item == null){
                    callback({IsSuccess: false, ErrorMessage: "User id not found"});
                } else {
                    if(data.Item.password.S === password){
                        let token = jwt.sign({id: data.Item.user_id, name: data.Item.name},'panda_secret',{expiresIn: '30d'});
                        callback({IsSuccess: true, Data: token});
                    } else {
                        callback({IsSuccess: false, ErrorMessage:" The Password is Invalid"});
                    }
                }
            }
        });
    }
};
const createUserHandler = (inputObj, callback) => {

};
const invalidInputHandler = (callback) => {
    let result = {
        IsSuccess : false,
        ErrorMessage: "Invalid Params"
    };
    callback(result);
};

const tokenValidator = (token) => {
    try{
        let decodeToken = jwt.verify(token, 'panda_secret');
        return {IsSuccess: true, Data: decodeToken};
    } catch {
        return {IsSuccess: false, ErrorMessage: "Invalid Token"};
    }
};

const createInvoiceHandler = (inputObj, callback) => {
    let token = tokenValidator(inputObj.Token);
    if(!token.IsSuccess){
        callback({IsSuccess: false, ErrorMessage: token.ErrorMessage});
    } else {
        let params = {
            TableName: 'invoice',
            Item:{
                'invoice_id': {S: uuidv1().toString()},
                'amount_by_day': {N: inputObj.Data.amountByDay.toString()},
                'duration': {S: inputObj.Data.duration},
                'happened_at': {S: inputObj.Data.happenedAt},
                'name': {S: inputObj.Data.name},
                'total_amount': {N: inputObj.Data.totalAmount.toString()},
                'user_id': {N: token.Data.id.N.toString()},
                'user_name': {S: token.Data.name.S},
                'category': {S: inputObj.Data.category}
            }
        };
        db.putItem(params, function(err, data){
            if(err){
                callback({IsSuccess: false, ErrorMessage: err});
            } else {
                callback({IsSuccess: true, Data: data});
            }
        });
    }
};

