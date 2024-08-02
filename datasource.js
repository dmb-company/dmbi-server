const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "<YOUR_DB_USERNAME>",
  password: "<YOUR_DB_PASSWORD>",
  database: "<YOUR_DB_NAME>",
  entities: ["dist/models/*.js"],
  migrations: ["dist/migrations/*.js"],
});

module.exports = {
  datasource: AppDataSource,
};
