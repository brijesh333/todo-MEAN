var db = require('./dbHandler');

module.exports = (operationType, payload) => {
    if (operationType === 'CREATE') {
        return new Promise((resolve, reject) => {
            db.operation.create(payload).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            )

        })
    } else if (operationType === 'DELETE') {
        return new Promise((resolve, reject) => {
            db.operation.delete(payload).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            )

        })
    } else if (operationType === 'VIEWALL') {
        return new Promise((resolve, reject) => {
            db.operation.getAll(payload).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            )

        });
    } else if (operationType === 'SEARCH') {
        return new Promise((resolve, reject) => {
            db.operation.search(payload).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            )

        });
    } else if (operationType === 'UPDATE') {
        return new Promise((resolve, reject) => {
            db.operation.update(payload).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            )

        });
    }
};