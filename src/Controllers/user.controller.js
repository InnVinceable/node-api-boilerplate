module.exports = (server, route, logger, dbConnection) => {
    server.get(route, (req, res, next) => {
        res.send('not implemented');
    });
    server.post(route, (req, res, next) => {
        res.send('not implemented');
    });
    server.put(route, (req, res, next) => {
        res.send('not implemented');
    });
}