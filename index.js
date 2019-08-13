const AWS = require('aws-sdk');
const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    let result = {};
    if(event.hasOwnProperty('Type')){
        if(event.Type === "Login"){
            let params = {
                TableName: 'panda_user',
                Key: {
                    'user_id': {N: event.Data.Id.toString()}
                }
            };
            db.getItem(params, function(err, data){
                if(err){
                    result.IsSuccess = false;
                    result.errorMessage = err;
                    callback(null, result);
                } else {
                    console.log(data);
                    if(data.Item == null){
                        result.IsSuccess = false;
                        result.errorMessage = "User id not found";
                    } else {
                        if(data.Item.password.S === event.Data.Password){
                            result.IsSuccess = true;
                            result.Data = data.Item;
                        } else {
                            result.IsSuccess = false;
                            result.errorMessage = "The Password is Invalid";
                        }
                    }
                    callback(null, result);
                }

            });
        }
    } else {
        result.IsSuccess = false;
        result.errorMessage = "Invalid Params";
        callback(null, result);
    }

};