const userRoute = require('./user');

function route(app) {
  app.use('/users', userRoute);
  app.get('/', (req, res) => {
    res.send('Hello');
  });
}

module.exports = route;
