import logger from '../Utils/Logger';
import roleService from '../Services/role.service';
import {isAuthorized} from '../Middleware/Auth';
import { ServiceError } from '../Services/ServiceErrorCodes';

module.exports = (server, route) => {
    server.get(`${route}/:Id`, isAuthorized(), (req, res, next) => {
        roleService.getRoleById(req.params.Id)
            .then((role) => {
                if (role) res.send(role);
            })
            .catch((err) => {
                if (err == ServiceError.NOT_FOUND) res.send(404);
                else {
                    logger.error(err);
                    res.send(500);
                }
            });
    });

    server.get(route, isAuthorized(), (req, res, next) => {
        roleService.getAllRoles()
            .then((roles) => {
                if (roles) res.send(roles);
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
        roleService.createRole(req.body)
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
        roleService.updateById(req.params.Id, req.body)
            .then(() => {
                res.send(200)
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            });
    });

    server.del(`${route}/:Id`, isAuthorized(), (req, res, next) => {
        roleService.deleteById(req.params.Id)
            .then(() => {
                res.send(200);
            })
            .catch((err) => {
                logger.error(err);
                res.send(500);
            })
    });
}