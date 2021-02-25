import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthVerified = {
    id: string;
    level: AuthLevel;
};

export enum AuthLevel {
    USER = "USER",
    ADMIN = "ADMIN",
}

export default (requiredLevels: AuthLevel[]) => {
    return {
        verify: (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers.authorization!!.split(" ")[1];
                const authVerified = jwt.verify(token, "SUPER_SS") as AuthVerified;

                if (!requiredLevels.includes(authVerified.level)) {
                    res.status(401).json({
                        error: true,
                        message: "unauthorized",
                    });
                } else {
                    req.authVerified = authVerified;
                    next();
                }
            } catch (e: any) {
                res.status(401).json({
                    error: true,
                    message: "unauthorized",
                });
            }
        },
    };
};
