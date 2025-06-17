import type { IncomingMessage } from "http";
require("dotenv").config();

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT       = process.env.PORT || 4000;
const TARGET_URL = process.env.TARGET_URL  || "http://www.ciseionline.it/2012";
const PREFIX     = process.env.PROXY_PATH  || "/cisei";

const app = express();

app.use(
    PREFIX,
    createProxyMiddleware({
        target: TARGET_URL,
        changeOrigin: true,
        pathRewrite: { [`^${PREFIX}`]: "" },
        on: {
            proxyRes(res: IncomingMessage & { headers: Record<string, any> }) {
                delete res.headers["x-frame-options"];
                delete res.headers["content-security-policy"];
            },
        },
    })
);

app.use(express.static("build"));

app.listen(PORT, () =>
    console.log(`🟢  Proxy + static http://localhost:${PORT}${PREFIX}/…`)
);
