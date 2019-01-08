import fs from 'fs';

function registerRoutes(server) {
    fs.readdirSync(`${__dirname}`)
        .filter(file => file.indexOf('.controller') > 0)
        .forEach(function(file) {
            let fileName = file.substr(0, file.indexOf('.js'));
            let routeName = file.substr(0, file.indexOf('.'));
            require(`./${fileName}`)(server, `/${routeName}`);
        });
}

export default registerRoutes;
