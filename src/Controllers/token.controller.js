import userService from '../Services/user.service';
import jwt from 'jsonwebtoken';
import { SECRET, OPTIONS} from '../../config/jwt.config';
import logger from '../Utils/Logger';

module.exports = (server, route) => {
    server.post(route, (req, res, next) => {
        userService.checkCredentials(req.body.Email, req.body.Password)
            .then(() => {
                let token = jwt.sign({
                        Email: req.body.Email,
                        DateObtained: Date.now()
                    }, SECRET, OPTIONS);
                res.send(token);
            })
            .catch((err) => {
                if (err) {
                    logger.error(err);
                } else {
                    logger.warn(`Login failed ${req.body.Email}`);
                }
                res.send(500);
            })
    });
}