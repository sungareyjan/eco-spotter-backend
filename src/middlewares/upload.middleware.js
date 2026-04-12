const multer = require('multer');

// Store file in memory (best for S3 / MinIO upload)
const storage = multer.memoryStorage();

const ALLOWED_TYPES = ['image/', 'video/'];

// block risky types even if they pass prefix
const BLOCKED_TYPES = ['image/svg+xml'];


const fileFilter = (req, file, cb) => {
    const isAllowed = ALLOWED_TYPES.some(type =>
        file.mimetype.startsWith(type)
    );

    const isBlocked = BLOCKED_TYPES.includes(file.mimetype);

    if (!isAllowed || isBlocked) {
        return cb(new Error('Only image, video, and audio files are allowed'), false);
    }

    cb(null, true);
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5 // max 5 files per request
    },
    fileFilter
});

module.exports = upload;