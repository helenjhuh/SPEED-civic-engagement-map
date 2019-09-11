const config = {
    app: {
        port: process.env.APP_PORT,
        sessionSecret: process.env.SESSION_SECRET,
        saltWorkFactor: process.env.SALT_WORK_FACTOR
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME
    },
    mapbox: {
        apiToken: process.env.MABOX_TOKEN
    }
}

export default config;