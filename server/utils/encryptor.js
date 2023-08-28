const crypto = require('crypto');

function createHash(string) {
    return crypto.createHmac('sha256', process.env.ENCRYPT_KEY).update(string).digest('base64url');
}
function compareHash(encrypted, string) {
    const hash = crypto.createHmac('sha256', process.env.ENCRYPT_KEY).update(string).digest('base64url');
    return encrypted === hash;
}

module.exports = {
    createHash,
    compareHash
}