const LOG_CONFIG = {
    appenders: { sdlog: { type: 'file', filename: 'sdlog.log' } },
    categories: { default: { appenders: ['sdlog'], level: 'debug' } }
}

export default LOG_CONFIG;