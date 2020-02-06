module.exports = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    sessionSecret: process.env.SESSION_SECRET,
    saltWorkFactor: process.env.SALT_WORK_FACTOR
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  mapbox: {
    apiToken: process.env.MAPBOX_TOKEN
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
    role: process.env.ADMIN_ROLE
  }
};
