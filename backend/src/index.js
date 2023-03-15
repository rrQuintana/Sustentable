require('dotenv').config();

const app = require('./app');
require('./database');

// Lógica para ejecutar el servidor
async function main(err){
    await app.listen(app.get('port'));
    if (err) console.error(err);
    console.log('Server on port', app.get('port'));
}

main();