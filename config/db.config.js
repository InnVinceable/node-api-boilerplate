export const SERVER = 'localhost';
export const INSTANCE = 'SQLEXPRESS';
export const DATABASE = 'testDATABASE';
export const USERNAME = 'testUser';
export const PASSWORD = 'testUser';
export const DB_OPTIONS = {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: 'mssql',

    // custom host; default: localhost
    host: 'localhost',

    dialectOptions: {
        instanceName: 'SQLEXPRESS'
    },

    // custom port; default: dialect default
    //port: 12345,

    // custom protocol; default: 'tcp'
    // postgres only, useful for Heroku
    // protocol: null,

    // disable logging; default: console.log
    // logging: false,

    // you can also pass any dialect options to the underlying dialect library
    // - default is empty
    // - currently supported: 'mysql', 'postgres', 'mssql'
    // dialectOptions: {
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    //     supportBigNumbers: true,
    //     bigNumberStrings: true
    // },

    // the storage engine for sqlite
    // - default ':memory:'
    // storage: 'path/to/database.sqlite',

    // disable inserting undefined values as NULL
    // - default: false
    // omitNull: true,

    // a flag for using a native library or not.
    // in the case of 'pg' -- set this to true will allow SSL support
    // - default: false
    // native: true,

    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: { timestamps: false }
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    // define: {
    //     underscored: false
    //     freezeTableName: false,
    //     charset: 'utf8',
    //     dialectOptions: {
    //     collate: 'utf8_general_ci'
    //     },
    //     timestamps: true
    // },

    // similar for sync: you can define this to always force sync for models
    // sync: { force: true },

    // pool configuration used to pool database connections
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },

    // isolation level of each transaction
    // defaults to dialect default
    // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
}