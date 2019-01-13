import logger from '../Utils/Logger';
import userService from '../Services/user.service';
import { ServiceError } from '../Services/ServiceErrorCodes';
import { isAuthenticated } from '../Middleware/Authentication';

module.exports = (server, route) => {
    server.get(`${route}/:Id`, isAuthenticated, (req, res, next) => {
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

    server.get(`${route}`, isAuthenticated, (req, res, next) => {
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
    
    server.post(route, isAuthenticated, (req, res, next) => {
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
    
    server.put(`${route}/:Id`, isAuthenticated, (req, res, next) => {
        userService.updateById(req.params.Id, req.body)
            .then(() => {
                res.send(200);
            }).catch((err) => {
                logger.error(err);
                res.send(500);
            });
    });

    server.del(`${route}/:Id`, isAuthenticated, (req, res, next) => {
        userService.deleteById(req.params.Id)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });
}