import log4js from 'log4js';
import LOG_CONFIG from '../../config/log.config';

log4js.configure(LOG_CONFIG);

const logger = log4js.getLogger();

export default logger;