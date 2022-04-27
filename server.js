require('./src/services/mongodbService')();
require('express')()
    .get(`/`, async (req,res) => res.send('Ok'))
    .use('/uploads', require('./src/router/downloadAPI'))
    .listen(+require('./config.json').PORT, () => console.log('Listening on ' + +require('./config.json').PORT));

