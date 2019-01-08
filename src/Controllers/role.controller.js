import logger from '../Utils/Logger';
import getDbConnection from '../Data/DatabaseConnection';

module.exports = (server, route) => {
    server.get(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findById(req.params.Id)
                .then((role) => {
                    if (role) res.send(role);
                    else res.send(404);
                });
        })
    });

    server.get(`${route}`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findAll()
                .then((roles) => {
                    if (roles) res.send(roles);
                    else res.send(404);
                });
        })
    });
    
    server.post(route, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.findOrCreate({where: {RoleName: req.body.RoleName}})
                .then(() => {
                    res.send(200);
                });
        });
    });
    
    server.put(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let Role = dbConnection.model('Role');
            Role.update(
                {
                    RoleName: req.body.RoleName
                },
                {
                    where: {
                        Id: req.params.Id
                    }
                }
            ).then(() => {
                res.send(200);
            }).catch((err) => {
                logger.Error(err);
            });
        });
    });

    server.del(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let roles = dbConnection.model('Roles');
            roles.destroy({
                where: {
                    Id: req.params.Id
                }
            })
            res.send(200);
        })
    });
}