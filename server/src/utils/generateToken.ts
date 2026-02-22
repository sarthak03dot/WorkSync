import jwt from "jsonwebtoken";
import { Response } from "express";

const generateTokens = (userId: string, res: Response) => {
    const accessTokenExpiresIn = 30; // 30 minutes
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || "access_secret", {
        expiresIn: `${accessTokenExpiresIn}m`,
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", {
        expiresIn: "7d",
    });

    // Calculate expiresAt (current time + 30 minutes)
    const expiresAt = Date.now() + accessTokenExpiresIn * 60 * 1000;

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: isProduction, // Only send over HTTPS in production
        sameSite: isProduction ? "none" : "lax", // 'none' requires 'secure: true'
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken, refreshToken, expiresAt };
};

export default generateTokens;
