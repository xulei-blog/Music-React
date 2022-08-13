
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://123.207.32.32:9001",
            changeOrigin: true,
            pathRewrite: {
                "/api": "",
            },
        })
    );
};
