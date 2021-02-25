import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthLevel } from "../middlewares/check-auth";

export const login = (req: Request, res: Response) => {
    if ((req.body.level as string) in AuthLevel) {
        const token = jwt.sign({ id: "1", level: req.body.level }, "SUPER_SS");

        res.status(200).json({
            error: false,
            token: token,
        });
    } else {
        res.status(500).json({
            error: true,
            message: "level invalid",
        });
    }
};

export const get = (req: Request, res: Response) => {
    if (req.authVerified.level === AuthLevel.USER) {
        res.status(200).json({
            error: false,
            message: `requested user by id: ${req.authVerified.id}`,
        });
    } else {
        res.status(200).json({
            error: false,
            message: `requested user by id: ${req.query.id}`,
        });
    }
};
