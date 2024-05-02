const db = require('./db/connection');  // Asegúrate de que este es el camino correcto

db.query('SELECT 1', (err, results) => {
    if (err) {
        console.log('La conexión está cerrada o no disponible:', err.message);
    } else {
        console.log('La conexión está activa y funcionando.');
    }
});
