import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(400).json({ message: "Unauthorized: No token provided" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.userid = verifyToken.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server (isAuth)error" });
    }

}

export default isAuth;