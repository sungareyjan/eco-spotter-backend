const sharp = require('sharp');
const storage = require('./storage.service');

async function uploadImage(buffer, key, mimeType) {

    //  original
    const imagePath = await storage.upload(buffer, key, mimeType);

    // thumbnail
    const thumbnailBuffer = await sharp(buffer)
        .resize(300, 300, { fit: 'cover' })
        .toBuffer();

    const thumbnailKey = key.replace('/original/', '/thumb/');

    const thumbnailPath = await storage.upload(
        thumbnailBuffer,
        thumbnailKey,
        'image/jpeg'
    );

    // icon
    const iconBuffer = await sharp(buffer)
        .resize(64, 64, { fit: 'cover' })
        .blur()
        .toBuffer();

    const iconKey = key.replace('/original/', '/icon/');

    const iconPath = await storage.upload(
        iconBuffer,
        iconKey,
        'image/jpeg'
    );

    return {
        imagePath,
        thumbnailPath,
        iconPath
    };
}

module.exports = {
    uploadImage
};