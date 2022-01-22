const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Conta365',
    description: 'Api de gestão financiera, para ter mais controle sobre suas finanças, mensais e anual.',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);