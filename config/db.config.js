export const SERVER = 'SERVER';
export const INSTANCE = 'INSTANCE';
export const DATABASE = 'DATABASE';
export const USERNAME = 'USERNAME';
export const PASSWORD = 'PASSWORD';
export const DB_OPTIONS = {
    dialect: 'mssql',
    dialectOptions: {
        connectionString: `Server=${SERVER}\\${INSTANCE};Database=${DATABASE}; Trusted_Connection=True;`
    }
}