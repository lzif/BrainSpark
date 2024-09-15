// app/routes/login.tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export default function Screen() {
  const navigation = useNavigation();
  return (
    <Form method="post" className="container p-5 flex flex-col gap-2 w-full">
      <input className="px-3 py-2" type="text" name="username" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button type="submit" disabled={navigation.state === "submitting"}>
        {navigation.state === "submitting" ? "Submitting" : "Sign In"}
      </button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("basic", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}
