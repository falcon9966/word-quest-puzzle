console.log('Loading server/app...');
const start = Date.now();
const app = require('../server/app');
console.log('Server/app loaded in', Date.now() - start, 'ms');
module.exports = app;
