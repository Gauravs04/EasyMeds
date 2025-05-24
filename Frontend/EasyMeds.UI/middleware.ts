import { type NextRequest, NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that are considered public (no authentication required)
  const isPublicPath = path === "/" || path === "/forgot-password" || path === "/home"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // If the user is on a public path and has a token, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If the user is not on a public path and doesn't have a token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Continue with the request if none of the above conditions are met
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"],
}
