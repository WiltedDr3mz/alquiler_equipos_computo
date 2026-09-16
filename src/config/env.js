const path = require('path');
const dotenv = require('dotenv');

// Carga primero el archivo específico del ambiente.
// Si no existe, usa .env como respaldo.
const ambiente = process.env.NODE_ENV || 'development';
const archivoAmbiente = path.resolve(process.cwd(), `.env.${ambiente}`);

const resultado = dotenv.config({ path: archivoAmbiente });

if (resultado.error) {
    dotenv.config();
}

module.exports = {
    ambiente: process.env.NODE_ENV || 'development'
};
