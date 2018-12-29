import Sequelize  from 'sequelize';
import { DATABASE, USERNAME, PASSWORD, DB_OPTIONS } from '../../config/db.config';
import modelsDefs from './DbModelDefs';

class DatabaseConnection {
    constructor(logger) {
        this.logger = logger;
    }

    async Connect() {
        let logger = this.logger;
        return new Promise((resolve, reject) => {
            try {
                this.sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, DB_OPTIONS);

                //test connection
                this.sequelize
                    .authenticate()
                    .then(() => {
                        logger.debug('Connected');
                    })
                    .catch(err => {
                        logger.error('Unable to connect to the database:', err);
                        reject(err);
                    });
                
                let promises = [];
                //define and sync models
                for (var i = 0 ; i < modelsDefs.length ; i++) {
                    let model = this.sequelize.define(modelsDefs[i].modelName, modelsDefs[i].definition(this.sequelize, Sequelize));
                    promises.push(model.sync({force: false}));
                }

                Promise.all(promises).then(() => {
                    resolve(this.sequelize);
                }).catch(err => {
                    this.logger.error('Error in data model sync');
                    reject(err);
                });
            } catch (e) {
                this.logger.error(e);
                reject(e);
            }
            
        })
    }
}

export default DatabaseConnection;
