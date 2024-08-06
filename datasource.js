const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "postgres",
  entities: ["dist/models/*.js"],
  migrations: ["dist/migrations/*.js"],
});

module.exports = {
  datasource: AppDataSource,
};
