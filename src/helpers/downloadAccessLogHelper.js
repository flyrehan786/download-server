const downloadAccessLogModel = require('../models/downloadAccessModel');
module.exports.saveRecord = async (phoneNo, fileName) => {
    await downloadAccessLogModel.save(phoneNo, fileName);    
}