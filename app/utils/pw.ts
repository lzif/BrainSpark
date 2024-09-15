import * as crypto from "crypto";

export function hashPassword(password: string): string {
  const algorithm = "sha256";
  const encoding = "hex";

  const salt = crypto.randomBytes(16).toString(encoding);

  const hash = crypto
    .createHmac(algorithm, salt)
    .update(password)
    .digest(encoding);

  const hashedPassword = `${salt}:${hash}`;

  return hashedPassword;
}

export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  const [salt, hash] = hashedPassword.split(":");
  const algorithm = "sha256";
  const encoding = "hex";

  const newHash = crypto
    .createHmac(algorithm, salt)
    .update(password)
    .digest(encoding);
  console.log(newHash,hash)
  return newHash === hash;
}
