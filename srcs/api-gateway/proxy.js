import { createProxyMiddleware } from 'http-proxy-middleware';

const inventoryProxy = createProxyMiddleware('/api/movies', {
    target: 'http://inventory-app:5000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': ''
    }
});

export default inventoryProxy;