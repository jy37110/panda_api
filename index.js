const credential = require('./credential.js');
const AWS = credential.updateCredential();
const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    if(event.hasOwnProperty('Action')){
        switch (event.Action) {
            case "Login":
                loginHandler(event, callback);
                break;
            case "Create User":
                createUserHandler();
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
                'user_id': {N: userId}
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
                        callback({IsSuccess: true, Data: data.Item});
                    } else {
                        callback({IsSuccess: false, ErrorMessage:" The Password is Invalid"});
                    }
                }
            }
        });
    }
};
const createUserHandler = () => {

};
const invalidInputHandler = (callback) => {
    let result = {
        IsSuccess : false,
        ErrorMessage: "Invalid Params"
    };
    callback(result);
};

