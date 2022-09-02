module.exports = {
  local: {
    database1: {
      username: process.env.DATABASE1_MDB_USERNAME,
      password: process.env.DATABASE1_MDB_PASSWORD,
      database: process.env.DATABASE1_MDB_DATABASE,
      host: process.env.DATABASE1_MDB_HOST,
      port: process.env.DATABASE1_MDB_PORT,
      dialect: process.env.DATABASE1_DB_DIALECT,
      logLevel: 'debug',
    }
  },
  development: {
    database1: {
      username: process.env.DATABASE1_MDB_USERNAME,
      password: process.env.DATABASE1_MDB_PASSWORD,
      database: process.env.DATABASE1_MDB_DATABASE,
      host: process.env.DATABASE1_MDB_HOST,
      port: process.env.DATABASE1_MDB_PORT,
      dialect: process.env.DATABASE1_DB_DIALECT,
      logLevel: 'debug',
    }
  },
  test: {
    database1: {
      username: process.env.DATABASE1_MDB_USERNAME,
      password: process.env.DATABASE1_MDB_PASSWORD,
      database: process.env.DATABASE1_MDB_DATABASE,
      host: process.env.DATABASE1_MDB_HOST,
      port: process.env.DATABASE1_MDB_PORT,
      dialect: process.env.DATABASE1_DB_DIALECT,
      logLevel: 'debug',
    }
  },
  production: {
    database1: {
      username: process.env.DATABASE1_MDB_USERNAME,
      password: process.env.DATABASE1_MDB_PASSWORD,
      database: process.env.DATABASE1_MDB_DATABASE,
      host: process.env.DATABASE1_MDB_HOST,
      port: process.env.DATABASE1_MDB_PORT,
      dialect: process.env.DATABASE1_DB_DIALECT,
      logLevel: false,
    }
  }
}
