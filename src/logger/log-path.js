const fs = require('fs');
const path = require('path');

function getDailyLogPath(type) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const dir = path.join(process.cwd(), 'logs', type, year.toString(), month, day);

    fs.mkdirSync(dir, { recursive: true });

    return path.join(dir, `${type}.log`);
}

module.exports = { getDailyLogPath };