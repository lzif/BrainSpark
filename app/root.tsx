import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import initEruda from "./utils/eruda";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const outlet = useOutlet();
  useEffect(()=>{
    initEruda()
  },[])
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={useLocation().pathname}
        initial={{ x: "10%", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        exit={{ x: "-40%", opacity: 0 }}
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div>
          <h1 className="font-black text-6xl">
            {error.status} {error.statusText}
          </h1>
          <p className="text-lg mt-3 mb-6">{error.data}</p>
          {error.status == 404 && (
            <a
              className="py-2 px-4 text-white bg-sky-500 mt-6 rounded-lg"
              href="/"
            >
              Go Back
            </a>
          )}
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
