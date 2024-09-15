import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request);
}

export default function Layout() {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <header className="sticky top-0 flex w-full justify-between p-2">
        <Link to="/" className="text-lg font-bold text-sky-500">
          Matter
        </Link>
        <nav>
          <Link to={user?.username ? "/logout" : "/login"}>
            {user?.username ? "Logout" : "Login"}
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
