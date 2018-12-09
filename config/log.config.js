const LOG_CONFIG = {
    appenders: { 
        sdlog: { type: 'file', filename: 'sdlog.log' },
        sdlogConsole: {type: 'console'}
    },
    categories: { default: { appenders: ['sdlog', 'sdlogConsole'], level: 'debug' } }
}

export default LOG_CONFIG;