const mongoose = require('mongoose');
const config = require('../../config.json');
module.exports = function () {
    mongoose.connect(config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to database'));
}