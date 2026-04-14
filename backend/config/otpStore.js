import crypto from "crypto";

const otpStore = new Map();

setInterval(() => {
    const now = Date.now();
    for (const [key, value] of otpStore.entries()) {
        if (value.expiresAt < now) otpStore.delete(key);
    }
}, 10 * 60 * 1000);

const generateTempId = () => crypto.randomBytes(32).toString("hex");

const generateOtp = () =>
    crypto.randomInt(100000, 999999).toString(); // cryptographically secure

export { otpStore, generateTempId, generateOtp };