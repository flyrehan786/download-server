const redisService = require('../services/redisService');
async function validate(credentials) {
    const _credentials = await redisService.db_chat_getValue(credentials.phone_no);
    const installationId = await redisService.db_installation_getValue(credentials.phone_no);
    return (
        JSON.parse(_credentials)[0] === credentials.username &&
        JSON.parse(_credentials)[1] === credentials.password &&
        installationId === credentials.installationId
    ) ? true : false;
}
exports.validate = validate;
