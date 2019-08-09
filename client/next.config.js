module.exports = {
    target: 'serverless',
    env: {
        special: process.env.API_URL,
    },
}
