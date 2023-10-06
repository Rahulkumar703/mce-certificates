import { createSecretKey } from "crypto";
import { SignJWT } from "jose";

const signJWT = async (payload, expiration) => {
    try {
        const SECRET_KEY = createSecretKey(process.env.JWT_SECRET);
        const token = await new SignJWT(payload) // details to  encode in the token
            .setProtectedHeader({ alg: 'HS256' }) // algorithm
            .setIssuedAt(Date.now())
            .setIssuer(process.env.JWT_ISSUER) // issuer
            .setAudience(process.env.JWT_AUDIENCE) // audience
            .setExpirationTime(expiration) // token expiration time, e.g., "1 day"
            .sign(SECRET_KEY);

        return token;

    } catch (error) {
        throw new Error(error.message)
    }
}

export default signJWT