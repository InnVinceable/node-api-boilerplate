import jwt from 'jsonwebtoken';
import { SECRET, OPTIONS } from '../../config/jwt.config';

export const isAuthenticated = (req, res, next) => {
    try {
        let authHeader = req.headers.authorization;
        let bearerSuffix = authHeader.split(' ')[0];
        if (bearerSuffix === 'Bearer') {
            let decodedToken = jwt.verify(authHeader.split(' ')[1], SECRET, OPTIONS);
            next();
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
