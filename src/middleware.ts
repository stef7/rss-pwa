import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = (req) => {
  const auth = req.headers.get("Authorization")?.match(/^Basic (\S+)/)?.[1];
  const [user, pass] = auth ? atob(auth).split(":") : [];
  if (
    user &&
    user === process.env.BASIC_AUTH_USER &&
    pass &&
    pass === process.env.BASIC_AUTH_PASS
  ) {
    return NextResponse.next();
  }
  return new Response("401 Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected Area"' },
  });
};
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|manifest.webmanifest).*)",
};
