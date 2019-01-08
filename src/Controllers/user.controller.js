import logger from '../Utils/Logger';
import userService from '../Services/user.service';
import atob from 'atob';
import sha1 from 'sha1';
import getDbConnection from '../Data/DatabaseConnection';

module.exports = (server, route) => {
    server.get(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.findById(req.params.Id)
                .then((user) => {
                    if (user) res.send(user);
                    else res.send(404);
                });
        });
    });

    server.get(`${route}`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.findAll()
                .then((users) => {
                    if (users) res.send(users);
                    else res.send(404);
                });
        });
    });
    
    server.post(route, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
        let User = dbConnection.model('User');
            User.find({where: {Email: req.body.Email}})
                .then((user) => {
                    if (user) {
                        res.send(409);
                        logger.warn(`User (${JSON.stringify(user.Email)}) already exists`);
                    } else {
                        User.create({
                            Name: req.body.Name,
                            Surname: req.body.Surname,
                            Email: req.body.Email,
                            PasswordHash: sha1(atob(req.body.Password))
                        });
                        res.send(200);
                    }
                });
        });
    });
    
    server.put(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let User = dbConnection.model('User');
            User.update(
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
                logger.error(err);
            });
        })
    });

    server.del(`${route}/:Id`, (req, res, next) => {
        getDbConnection().then((dbConnection) => {
            let users = dbConnection.model('User');
            users.destroy({
                where: {
                    Id: req.params.Id
                }
            })
            res.send(200);
        })
    });
}