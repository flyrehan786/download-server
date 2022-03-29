const router = require('express').Router();
const dowloadAccessLogsHelper = require('../helpers/downloadAccessLogHelper');
const authValidator = require('../validator/authValidator');
const fs = require('fs');
const path = require('path');
const MOCK_REQUEST_HEADER = {
    auth: '{"username":"457f0opsrnggu3i8354t","password":"y8knfiag1ab2i5637qyl","installationId":"d9ffd48b0d7d962ea5e38f4e202dafaf7809fa7effd1c12682aacf943b1caf86","phone_no":"1237"}'
}
router.get(`/:fileName`,
    async (req, res) => {
        // const AUTH = req.headers.auth;
        const MOCK_AUTH = MOCK_REQUEST_HEADER.auth;
        const VALIDATED = await authValidator.validate(JSON.parse(MOCK_AUTH));
        if (VALIDATED) {
            await dowloadAccessLogsHelper.saveRecord(JSON.parse(MOCK_AUTH).phone_no, req.params.fileName)
            const FILE = path.join(__dirname, '..', '..', 'updates', req.params.fileName)
            console.log(FILE);
            if (fs.existsSync(FILE)) res.download(FILE);
            else res.json({ message: "File not exists" });
        } else res.json({ exit: 1, message: "User Authentication Failed." })
    }
)
module.exports = router;