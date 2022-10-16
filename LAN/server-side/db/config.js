const { Sequelize } = require("sequelize");
const config={

    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
    port:process.env.DB_PORT,
}
module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
      port: config.port,
      host: config.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  }
);
