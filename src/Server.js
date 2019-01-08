import restify from 'restify';
import { PORT } from '../config/config';
import LOG_CONFIG from '../config/log.config';
import logger from './Utils/Logger';
import registerRoutes from './Controllers/index';

// Server
var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

registerRoutes(server, logger);

server.listen(PORT, () => {
    logger.info(`Server started. Listening on ${PORT}`);
});

