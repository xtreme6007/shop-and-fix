module.exports = {
  "development": {
    "username": process.env.username,
    "password": process.env.dbpass,
    "database": process.env.db,
    "host": process.env.host,
    "dialect": "mysql",
    "force": "true"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}


