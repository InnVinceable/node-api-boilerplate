import getDbConnection from '../Data/DatabaseConnection';
import { ServiceError } from './ServiceErrorCodes';

export const getRoleById = (id) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findById(id)
                .then((role) => {
                    if (role) res(role);
                    else rej(ServiceError.NOT_FOUND);
                })
                .catch((err) => {
                    rej(err);
                });
        })
    });
}

export const getAllRoles = () => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findAll()
                .then((roles) => {
                    if (roles) res(roles);
                    else res(ServiceError.NOT_FOUND);
                })
                .catch((err) => {
                    rej(err);
                });
        })
    });
}

export const createRole = (roleDetails) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findOrCreate({where: {RoleName: roleDetails.RoleName}})
                .then(() => {
                    res();
                })
                .catch((err) => {
                    rej(err);
                });;
        });
    });
}

export const updateById = (id, roleDetails) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.update(
                {
                    RoleName: roleDetails.RoleName,
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

export const deleteById = (id) => {
    return new Promise((res, rej) => {
        getDbConnection().then((dbConnection) => {
            let roles = dbConnection.model('Role');
            roles.destroy({
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
    getRoleById,
    getAllRoles,
    createRole,
    updateById,
    deleteById
}