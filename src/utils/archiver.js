const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function getNextBatchNumber(dir, type, dateStr) {
    if (!fs.existsSync(dir)) return 1;

    const files = fs.readdirSync(dir);

    const matches = files
        .map(f => f.match(new RegExp(`${dateStr}-(\\d+)-${type}\\.zip`)))
        .filter(Boolean)
        .map(m => parseInt(m[1], 10));

    if (matches.length === 0) return 1;

    return Math.max(...matches) + 1;
}

function zipDailyLogs(type, date = new Date()) {
    const appName = process.env.APP_NAME || 'eco-spotter-app';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateStr = `${year}${month}${day}`;

    const logDir = path.join(
        process.cwd(),
        'logs',
        type,
        year.toString(),
        month,
        day
    );

    if (!fs.existsSync(logDir)) return;

    // archive folder
    const archiveDir = path.join(
        process.cwd(),
        'logs',
        'archive',
        type,
        year.toString(),
        month,
        day
    );

    fs.mkdirSync(archiveDir, { recursive: true });

    //  batch number (1,2,3...)
    const batch = getNextBatchNumber(archiveDir, type, dateStr);

    const zipName = `${appName}-${dateStr}-${batch}-${type}.zip`;

    const zipPath = path.join(archiveDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(` Created: ${zipName}`);

        // safe delete after zip completes
        fs.readdirSync(logDir).forEach(file => {
            fs.unlinkSync(path.join(logDir, file));
        });
    });

    archive.on('error', (err) => {
        console.error('Archive error:', err);
    });

    archive.pipe(output);
    archive.directory(logDir, false);
    archive.finalize();
}

module.exports = { zipDailyLogs };