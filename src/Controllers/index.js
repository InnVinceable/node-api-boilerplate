import fs from 'fs';

function registerRoutes(logger, dbConnection) {
    fs.readdirSync(`${__dirname}/Controllers`)
        .filter(file => file.indexOf('.controller' > 0))
        .forEach(function(file) {
            let fileName = file.substr(0, file.indexOf('.js'));
            let routeName = file.substr(0, file.indexOf('.'));
            require(`./Controllers/${fileName}`)(server, `/${routeName}`);
        });
}

export default registerRoutes;
