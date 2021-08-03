const env = {
    database: 'epicroadtrip',
    username: 'root',
    password: '2@r/@&!Y4fat2Zx',
    host: 'mariadb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;