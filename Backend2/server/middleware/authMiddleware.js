import jwt from "jsonwebtoken";

const verifyToken = (
    req,
    res,
    next
) => {

    try {

        const token =
            req.headers.token;

        if (!token) {

            return res.status(401).json({
                code: 401,
                message: "Token Missing"
            });
        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            code: 401,
            message: "Invalid Token"
        });
    }
};

export default verifyToken;