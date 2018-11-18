import jwt from 'jsonwebtoken';
import { SECRET } from '../../config/jwt.config';

export const tokenAuthenticationChecker = (req, res, next) => {
    try {
        let authHeader = req.headers.Authorization;
        let bearerSuffix = authHeader.split(' ')[0];
        if (bearerSuffix === 'Bearer') {
            let decoded = jwt.verify(authHeader[1], SECRET);
            next();
        }
        else {
            next(false);
        }
    } catch (ex) {
        next(false);
    }
    
}
