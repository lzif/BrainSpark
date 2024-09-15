import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Hello</h1>
      {user.username!}
    </>
  );
}
