import getDbConnection from '../Data/DatabaseConnection';
import { ServiceError } from './ServiceErrorCodes';
import atob from 'atob';
import sha1 from 'sha1';

export const getUserById = (id) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.findById(id)
                .then((user) => {
                    if (user) res(user);
                    else rej(ServiceError.NOT_FOUND);
                })
                .catch((err) => {
                    rej(err);
                });
        });
    });
}

export const getAllUsers = () => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.findAll()
                .then((users) => {
                    if (users) res(users);
                    else rej(ServiceError.NOT_FOUND);
                })
                .catch((err) => {
                    rej(err);
                });
        });
    });
}

export const createUser = (userDetails) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
                User.find({where: {Email: userDetails.Email}})
                    .then((user) => {
                        if (user) {
                            rej(ServiceError.ALREADY_EXISTS);
                            logger.warn(`User (${JSON.stringify(user.Email)}) already exists`);
                        } else {
                            User.create({
                                Name: userDetails.Name,
                                Surname: userDetails.Surname,
                                Email: userDetails.Email,
                                PasswordHash: sha1(atob(userDetails.Password))
                            }).then(res);
                        }
                    })
                    .catch((err) => {
                        rej(err);
                    });
            });
    });
}

export const updateById = (id, userDetails) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.update(
                {
                    Name: userDetails.Name,
                    Surname: userDetails.Surname,
                    Email: userDetails.Email,
                    PasswordHash: sha1(atob(userDetails.Password))
                },
                {
                    where: {
                        Id: id
                    }
                }
            ).then(() => {
                res();
            }).catch((err) => {
                rej(err);
            });
        })
    });
}

export const resetPassword = (id, userDetails) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.update(
                {
                    PasswordHash: sha1(atob(userDetails.Password))
                },
                {
                    where: {
                        Id: id
                    }
                }
            ).then(() => {
                res();
            }).catch((err) => {
                rej(err);
            });
        })
    });
}

export const checkCredentials = (email, password) => {
    return new Promise((res, rej) => {
        var hash = sha1(atob(password));
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.find({where: {Email: email}})
                .then((user) => {
                    if (user && hash == user.PasswordHash) {
                        res();
                    } else {
                        rej();
                    }
                })
                .catch((err) => {
                    rej(err);
                });
        })
    });
}

export const deleteById = (id) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let users = dbConnection.model('User');
            users.destroy({
                where: {
                    Id: id
                }
            })
            .then(() => {
                res();
            })
            .catch((err) => {
                rej(err)
            })
        });
    });
}

export default {
    getUserById,
    getAllUsers,
    createUser,
    updateById,
    deleteById,
    resetPassword,
    checkCredentials
}