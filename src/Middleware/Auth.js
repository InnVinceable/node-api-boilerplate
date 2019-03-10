import jwt from 'jsonwebtoken';
import { SECRET, OPTIONS } from '../../config/jwt.config';

export const isAuthorized = (roles) => {
    return (req, res, next) => {
        try {
            let authHeader = req.headers.authorization;
            let bearerSuffix = authHeader.split(' ')[0];
            if (bearerSuffix === 'Bearer') {
                let decodedToken = jwt.verify(authHeader.split(' ')[1], SECRET, OPTIONS);
                if (roles && roles.length) {
                    if (decodedToken.Roles && decodedToken.Roles.length) {
                        for (var i = 0 ; i < decodedToken.Roles.length ; i++) {
                            if (roles.indexOf(decodedToken.Roles[i]) > -1) {
                                return next()
                                break;
                            }
                            res.send(401, 'Unauthorized');
                            return next(false);
                        }
                    }
                    else {
                        res.send(401, 'Unauthorized');
                        return next(false);
                    }
                }
                else {
                    next();
                }
            }
            else {
                res.send(401, 'Unauthorized');
                return next(false);
            }
        } catch (ex) {
            res.send(401, 'Unauthorized');
            return next(false);
        }
        
    }
}



