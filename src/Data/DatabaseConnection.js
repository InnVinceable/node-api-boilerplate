import Sequelize  from 'sequelize';
import { DATABASE, USERNAME, PASSWORD, DB_OPTIONS } from '../../config/db.config';
import modelsDefs from './DbModelDefs';

class DatabaseConnection {
    constructor(logger) {
        this.logger = logger;
    }

    Connect(onSuccess, onFailed) {
        return new Promise((resolve, reject) => {
            this.sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, DB_OPTIONS);

            //test connection
            this.sequelize
                .authenticate()
                .then(() => {
                    logger.debug('Connected');
                })
                .catch(err => {
                    logger.error('Unable to connect to the database:', err);
                    if (onFailedTest) {
                        reject();
                    }
                });
            
            //define and sync models
            for (i = 0 ; i < modelsDefs.length ; i++) {
                let model = this.sequelize.define(modelsDefs[i].modelName, modelsDefs[i].definition);
                await model.sync({force: false}).catch(err => {this.logger.error(err)});
            }

            resolve(this.sequelize);
        })
    }
}

export default DatabaseConnection;
