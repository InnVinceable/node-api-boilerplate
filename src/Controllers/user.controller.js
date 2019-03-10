import logger from '../Utils/Logger';
import userService from '../Services/user.service';
import { ServiceError } from '../Services/ServiceErrorCodes';
import { isAuthorized } from '../Middleware/Auth';

module.exports = (server, route) => {
    server.get(`${route}/:Id`, isAuthorized(), (req, res, next) => {
        userService.getUserById(req.params.Id)
            .then((user) => {
                if (user) res.send(user);
            })
            .catch((err) => {
                if (err == ServiceError.NOT_FOUND) res.send(404);
                else {
                    logger.error(err);
                    res.send(500);
                }
            });
    });

    server.get(`${route}`, isAuthorized([1,4]), (req, res, next) => {
        userService.getAllUsers()
            .then((users) => {
                if (users) res.send(users);
            })
            .catch((err) => {
                if (err == ServiceError.NOT_FOUND) res.send(404);
                else {
                    logger.error(err);
                    res.send(500);
                }
            });
    });
    
    server.post(route, isAuthorized(), (req, res, next) => {
        userService.createUser(req.body)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                if (err == ServiceError.NOT_FOUND) {
                    res.send(409);
                    logger.warn(`User (${JSON.stringify(user.Email)}) already exists`);
                }
                else {
                    logger.error(err);
                    res.send(500);
                }
            });
    });
    
    server.put(`${route}/:Id`, isAuthorized(), (req, res, next) => {
        userService.updateById(req.params.Id, req.body)
            .then(() => {
                res.send(200);
            }).catch((err) => {
                logger.error(err);
                res.send(500);
            });
    });

    server.del(`${route}/:Id`, isAuthorized(), (req, res, next) => {
        userService.deleteById(req.params.Id)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });

    server.post(`${route}/:Id/role/:roleId`, isAuthorized(), (req, res, next) => {
        userService.assignRole(req.params.Id, req.params.roleId)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });

    server.del(`${route}/:Id/role/:roleId`, isAuthorized(), (req, res, next) => {
        userService.revokeRole(req.params.Id, req.params.roleId)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });

    server.get(`${route}/:Id/role`, isAuthorized(), (req, res, next) => {
        userService.getUserRoles(req.params.Id)
            .then((roles) => {
                res.send(roles);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });
}