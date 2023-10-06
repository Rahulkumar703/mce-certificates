
import { createSecretKey } from 'crypto';
import { jwtVerify } from 'jose';

const verifyJWT = async (token) => {
    // extract token from request
    try {

        // verify token
        const SECRET_KEY = createSecretKey(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, SECRET_KEY, {
            issuer: process.env.JWT_ISSUER, // issuer
            audience: process.env.JWT_AUDIENCE, // audience
        });

        return payload;

    } catch (e) {
        // token verification failed
        throw new Error('Session Expired.')
    }

}

export default verifyJWT