import { registerAs } from "@nestjs/config";

export default registerAs("jwt",()=>({
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "xyz",
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || "zyx",
    accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || "1d",
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d"
}));