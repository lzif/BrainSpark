import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { loginOrRegister } from "./db.server";
import { hashPassword } from "~/utils/pw";

interface User {
  username: string | undefined;
  roles: string[] | undefined;
}

export let authenticator = new Authenticator<User>(sessionStorage, {throwOnError:true});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let username = form.get("username") as string;
    let password = form.get("password") as string;
    let hashedPassword = hashPassword(password);
    let user = await loginOrRegister({ username, password, hashedPassword });
    if (!user) {
      throw new Error("user not found");
    }
    console.log("user:", user);
    return user;
  }),
  "basic"
);
