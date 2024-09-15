import { getXataClient } from "./xata.server";
import { verifyPassword } from "~/utils/pw";

export const xata = getXataClient();
const db = xata.db;
export default db;

export async function loginOrRegister({
  username,
  password,
  hashedPassword,
}: {
  username: string;
  password: string;
  hashedPassword: string;
}) {
  console.log({ username, password });
  try {
    console.log("getting user ...");
    const user = await xata.db.users
      .select(["username", "roles", "password"])
      .filter({ username: username })
      .getFirstOrThrow();
    if (user) {
      let verified = verifyPassword(password, user.password!);
      if (verified) {
        return { username, roles: user.roles };
      } else {
        throw new Error("Password incorrect");
      }
    } else {
      console.log("user not found\ncreate user ...");
      return await xata.db.users.createOrUpdate(
        { username, password: hashedPassword, roles: ["user"] },
        ["username", "roles"]
      );
    }
  } catch (e) {
    console.error(e);
  }
}
