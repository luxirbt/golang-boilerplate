module.exports = {
    env: {
        baseUrl: 'http://localhost:3001',
    },
    async rewrites() {
        return [
            {
                source: '/login/:path*',
                destination: 'http://localhost:3002/:path*',
            },
        ];
    },
};
