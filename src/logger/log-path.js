const fs = require('fs');
const path = require('path');

let logCounter = 0;
function getDailyLogPath(type) {
    const appName = process.env.APP_NAME;
    logCounter++;
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    const dir = path.join(process.cwd(), 'logs', type, year.toString(), month, day);

    fs.mkdirSync(dir, { recursive: true });

    return path.join(dir, `${appName}-${type}-${dateStr}-${logCounter}-${type}.log`);
}

module.exports = { getDailyLogPath };