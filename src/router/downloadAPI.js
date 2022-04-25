const router = require('express').Router();
const dowloadAccessLogsHelper = require('../helpers/downloadAccessLogHelper');
const fs = require('fs');
const path = require('path');
router.get(`/:fileName`,
    async (req, res) => {
        try {
            let phoneNo = req.body?.auth?.phone_no;
            if(phoneNo)await dowloadAccessLogsHelper.saveRecord(phoneNo, req.params.fileName)
            const FILE = path.join(__dirname, '..', '..', 'updates', req.params.fileName)
            if (fs.existsSync(FILE)) res.download(FILE);
            else res.json({ message: "File not exists" });
        } catch (error) {
            console.log(new Error(error).name);
            console.log(new Error(error).message);
        }
    }
)
module.exports = router;