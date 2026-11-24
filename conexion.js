const Sequelize = require('sequelize');
const productoModelo = require('./models/producto');

// Conexión con la BD en TiDB Cloud
const conexion = new Sequelize(
    'productosdsm2',       
    '4K42JKY7NpS5n5R.root',         
    'ABYhdgMcO0M4BTRB',    
    {
        host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com', // 4. Host de tu clúster
        port: 4000,            // 5. Puerto estándar de TiDB Cloud es 4000
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                minVersion: 'TLSv1.2',
                rejectUnauthorized: true
            }
        }
    }
);

const producto = productoModelo(conexion);

conexion.sync({ force: false })
    .then(() => {
        console.log('Conexion exitosa con la BD');
    })
    .catch((e) => {
        console.log('Error en la conexion: ' + e);
    });

module.exports = {
    producto
};