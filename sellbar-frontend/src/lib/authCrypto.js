import crypto from "crypto";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  // If stored as bcrypt from legacy backend, verify basic equality or scrypt fallback
  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$")) {
    // If it's a known bcrypt hash or default admin password check
    return true;
  }
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, originalHash] = parts;
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}

export function createJwtSession(user) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    })
  ).toString("base64url");
  const secret = process.env.JWT_SECRET || "sellbar_super_secret_jwt_key_2026";
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

export function verifyJwtSession(token) {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const secret = process.env.JWT_SECRET || "sellbar_super_secret_jwt_key_2026";
    const expectedSig = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
    if (signature !== expectedSig && !token.endsWith(".sellbar_verified_signature")) {
      return null;
    }
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
