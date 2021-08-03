const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: '2@r/@&!Y4fat2Zx',
    database: 'epicroadtrip'
})
module.exports={
    getConnection: function(){
        return new Promise(function(resolve,reject){
            pool.getConnection().then(function(connection){
                resolve(connection);
            }).catch(function(error){
                reject(error);
            });
        });
    }
}