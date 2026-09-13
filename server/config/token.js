import jwt from 'jsonwebtoken';

const genToken = async (userid) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set in server .env");
    }
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export default genToken; 