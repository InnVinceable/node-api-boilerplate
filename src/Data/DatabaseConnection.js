import Sequelize  from 'sequelize';
import { DATABASE, USERNAME, PASSWORD, DB_OPTIONS } from '../../config/db.config';
import logger from '../Utils/Logger';
import modelsDefs from './DbModelDefs';

var sequelize;

export default async () => {
    return new Promise((resolve, reject) => {
        try {
            if (sequelize) {
                resolve(sequelize);
            } else {
                sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, DB_OPTIONS);
                
                //test connection
                sequelize
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
                    let model = sequelize.define(modelsDefs[i].modelName, modelsDefs[i].definition(sequelize, Sequelize));
                    promises.push(model.sync({force: false}));
                }

                Promise.all(promises).then(() => {
                    resolve(sequelize);
                }).catch(err => {
                    this.logger.error('Error in data model sync');
                    reject(err);
                });
            }
        } catch (e) {
            logger.error(e);
            reject(e);
        }
    })
};
