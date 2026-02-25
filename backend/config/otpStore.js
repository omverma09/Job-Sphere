import { v4 as uuidv4 } from "uuid";

export const otpStore = new Map();
export const generateTempId = () => uuidv4();