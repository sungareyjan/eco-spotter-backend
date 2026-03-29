const UAParser = require('ua-parser-js');

const detectOSFromUA = (uaString) => {
    if (/windows/i.test(uaString)) return 'Windows';
    if (/mac/i.test(uaString)) return 'MacOS';
    if (/linux/i.test(uaString)) return 'Linux';
    if (/android/i.test(uaString)) return 'Android';
    if (/iphone|ipad/i.test(uaString)) return 'iOS';
    return 'Unknown';
};

const extractClientInfo = (req) => {
    const uaString = req.headers['user-agent'] || 'Unknown UA';
    console.log('User-Agent String:', uaString);

    const ua = new UAParser(uaString).getResult();
    console.log('UAParser Result:', ua);

    const isTestClient =
        uaString.toLowerCase().includes('postman') ||
        uaString.toLowerCase().includes('axios');
    console.log('Is Test Client:', isTestClient);

    const rawIP =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        req.ip ||
        null;

    const normalizeIP = (ip) => ip?.replace('::ffff:', '') || null;
    console.log('Raw IP:', rawIP);

    const deviceType =
        ua.device?.type === 'mobile' ? 'Mobile' :
        ua.device?.type === 'tablet' ? 'Tablet' :
        'Desktop';
    console.log('Device Type:', deviceType);

    const os = ua.os?.name || detectOSFromUA(uaString);
    console.log('Detected OS:', os);

    const deviceUnit = ua.device?.vendor && ua.device?.model
        ? `${ua.device.vendor} ${ua.device.model}`
        : uaString;
    console.log('Device Unit:', deviceUnit);

    const clientInfo = {
        ip: normalizeIP(rawIP),
        browser: isTestClient ? uaString : (ua.browser?.name || 'Unknown'),
        browserVersion: ua.browser?.version || null,
        os,
        device: deviceType,
        deviceUnit,
        userAgent: uaString,
        source: isTestClient ? 'test-client' : 'real-user'
    };

    console.log('Final Client Info:', clientInfo);
    return clientInfo;
};

module.exports = { extractClientInfo };