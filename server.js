require('./src/services/mongodbService')();
require('express')()
    .get(`/`, async () => res.send('Ok'))
    .use('/uploads', require('./src/router/downloadAPI'))
    .listen(+require('./config.json').PORT, () => console.log('Listening on 4200'));

