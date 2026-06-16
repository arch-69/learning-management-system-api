import { registerAs } from "@nestjs/config";

export default registerAs('app', ()=>({
    nodeEnv:process.env.NODE_ENV || "developement",
    port:parseInt(process.env.PORT || "3000", 10),
    apiPrefix:process.env.API_PREFIX || "api/v1",
    corsOrigins:(process.env.CORS_ORIGIN || "http://localhost:3001")
        .split(",")
        .map((origin)=> origin.trim())
}))