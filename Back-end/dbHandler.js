var url = "mongodb://localhost:27017";
var mongoClient = require('mongodb').MongoClient;

let error = {
    status: 'ERROR',
    message: 'Error occured while processing your data'
};

var ObjectId = require('mongodb').ObjectId;

var inseartData = function (payload) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                reject({
                    status: 'ERROR',
                    message: 'Problem occured while processing your request'
                });
            } else {
                console.log("connection successful");
                var db = client.db('mydb');
                db.collection('todo').insertOne(payload, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            status: 'SUCCESS',
                            message: 'Data inserted successfully'
                        })
                    }
                })
            }
        });
    });
};

var getAllData = function () {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                return {
                    status: 'error',
                    message: 'no data found'
                }
            } else {
                console.log("connection successful");
                var db = client.db('mydb');
                db.collection('todo').find({}).toArray(function (err, res) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        // console.log(res);
                        let response = {
                            status: 'SUCCESS',
                            data: res
                        };
                        resolve(response);
                        // return response;
                    }
                });
            }
        });
    })
}

var searchRecordbyId = function (payload) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                reject({
                    status: 'ERROR',
                    message: 'Proble occurred'
                });
            } else {
                console.log("connection successful");
                var db = client.db('mydb');
                let query = {
                    _id: ObjectId(payload.id)
                }
                db.collection('todo').find(query).toArray(function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(res);
                        resolve(res);
                    }
                });
            }
        });
    })

}

var updateData = async function (payload) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                reject({
                    status: 'ERROR',
                    message: 'Problem occurred'
                });
            } else {
                console.log("connection successful");
                var db = client.db('mydb');

                var oldValue = {
                    _id: ObjectId(payload.oldValue.id)
                };
                var newValue = {
                    $set: payload.newValue
                };
                db.collection('todo').updateOne(oldValue, newValue, function (err, res) {
                    if (err) {
                        reject({
                            status: 'ERROR'
                        });
                    } else {
                        resolve({
                            status: 'SUCCESS',
                            message: 'Data updated successfully'
                        });
                    }
                });
            }
        });
    })

}

var deleteData = async function (payload) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) {
                reject({
                    status: 'ERROR',
                    message: 'no data found'
                });
            } else {
                console.log("connection successful");
                var db = client.db('mydb');
                let query = {
                    _id: ObjectId(payload.id)
                }
                db.collection('todo').deleteOne(query, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            status: 'SUCCESS',
                            message: 'Data deleted successfully'
                        });
                    }
                });
            }
        });
    })

}

module.exports = {
    operation: {
        create: inseartData,
        delete: deleteData,
        update: updateData,
        getAll: getAllData,
        search: searchRecordbyId
    }
}