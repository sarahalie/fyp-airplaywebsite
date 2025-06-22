module.exports = {
  development: {
    username: 'root',
    password: '',  // default XAMPP MySQL password is empty
    database: 'dyslexia_learning',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: console.log
  },
  test: {
    username: 'root',
    password: '',
    database: 'dyslexia_learning_test',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dyslexia_learning',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
}; 