const { doubleCsrf } = require("csrf-csrf");

const csrf = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,

    cookieName: "x-csrf-token",

    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    },

    size: 64,

    ignoredMethods: ["GET", "HEAD", "OPTIONS"],

    //  for APIs session
    // getSessionIdentifier: (req) => req.ip
    getSessionIdentifier: (req) => req.ip + req.headers["user-agent"]
});

module.exports = {
    generateCsrfToken: csrf.generateCsrfToken,
    doubleCsrfProtection: csrf.doubleCsrfProtection
};