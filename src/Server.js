import restify from 'restify';
import { PORT } from '../config/config';
import LOG_CONFIG from '../config/log.config';
import logger from './Utils/Logger';
import DatabaseConnection from './Data/DatabaseConnection';
import registerRoutes from './Controllers/index';

var databaseConnection = new DatabaseConnection(logger);
databaseConnection
    .Connect()
    .then((sequelize) => {
            // Server
            var server = restify.createServer();
            server.use(restify.plugins.queryParser());
            server.use(restify.plugins.bodyParser());

            registerRoutes(server, logger, sequelize);

            server.listen(PORT, () => {
                logger.info(`Server started. Listening on ${PORT}`);
            });
        })
    .catch((error) => {
            logger.error(error);
        });


