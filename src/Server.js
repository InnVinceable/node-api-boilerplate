import restify from 'restify';
import log4js from 'log4js';
import Sequelize  from 'sequelize';
import { ContainerBuilder } from 'node-dependency-injection';
import LOG_CONFIG from '../config/log.config';
import { PORT } from '../config/config'
import { DATABASE, USERNAME, PASSWORD, DB_OPTIONS } from '../config/db.config';
import { 
    usersController,
    ordersController,
    vendorsController,
    inventoryController,
    tokenController
} from './API';

const container = new ContainerBuilder();
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, DB_OPTIONS);
container.register('database', sequelize);

// Logging
log4js.configure(LOG_CONFIG);
const logger = log4js.getLogger('sdlog');

// Server
var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


usersController(server, logger);
ordersController(server, logger);
vendorsController(server, logger);
inventoryController(server, logger);
tokenController(server, logger);

server.listen(PORT, () => {
    logger.info(`Server started. Listening on ${PORT}`);
});
