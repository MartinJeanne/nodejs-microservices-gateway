const PRODUCT_HOST = process.env.PRODUCT_HOST || '127.0.0.1';
const COMMAND_HOST = process.env.COMMAND_HOST || '127.0.0.1';

module.exports = [
    {
        url: '/api/products',
        proxyOptions: {
            target: `http://${PRODUCT_HOST}:3000`,
            changeOrigin: true
        }
    },
    {
        url: '/api/commands',
        proxyOptions: {
            target: `http://${COMMAND_HOST}:3001`,
            changeOrigin: true
        }
    }
]
