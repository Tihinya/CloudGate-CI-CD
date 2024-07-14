import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const inventoryProxy = createProxyMiddleware({
    target: 'http://inventory-app:5000/api/movies',
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': ''
    },
    onProxyReq: fixRequestBody
});

export default inventoryProxy;