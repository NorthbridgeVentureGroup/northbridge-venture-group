import { NextRequest, NextResponse } from "next/server";
import { resolveMarketingRoute } from "@/lib/subdomain-routing";

export function middleware(request: NextRequest) {
  const route = resolveMarketingRoute(
    request.headers.get("host"),
    request.nextUrl.pathname,
  );

  if (!route) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = route;

  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|og-image.png).*)"],
};
