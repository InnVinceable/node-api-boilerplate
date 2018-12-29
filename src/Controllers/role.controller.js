module.exports = (server, route, logger, dbConnection) => {
    server.get(route, (req, res, next) => {
        res.send('not implemented');
    });
    server.post(route, (req, res, next) => {
        let Role = dbConnection.model('Role');
        Role.findOrCreate({where: {RoleName: req.body.RoleName}})
            .then(() => {
                res.send('Role Created');
            });
    });
    server.put(route, (req, res, next) => {
        res.send('not implemented');
    });
}