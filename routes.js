module.exports = [
    {
        source: '/api/products',
        proxy: {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    },
    {
        source: '/api/commands',
        proxy: {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    }
]