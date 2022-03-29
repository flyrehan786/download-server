const mongoose = require("mongoose");
const downloadAccessLog = mongoose.model(
  "dowloadAccessLogs",
  new mongoose.Schema({
    phoneNo: { type: String },
    fileName: { type: String },
    datetime: { type: Date }, // { Count: INT, messageText: STRING, type: string }
  })
);
async function save(phoneNo, fileName) {
  let accessLog = new downloadAccessLog();
  accessLog.phoneNo = phoneNo;
  accessLog.fileName = fileName;
  accessLog.datetime = new Date().getTime();
  let result = await accessLog.save();
  return result;
}
module.exports = {
  save
}