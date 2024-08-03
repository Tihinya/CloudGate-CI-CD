import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { config } from 'dotenv';

config();

const PORT = process.env.INVENTORY_APP_PORT;
const HOST = process.env.INVENTORY_HOST;


const inventoryProxy = createProxyMiddleware({
    target: `http://${HOST}:${PORT}/api/movies`,
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': ''
    },
    onProxyReq: fixRequestBody
});

export default inventoryProxy;