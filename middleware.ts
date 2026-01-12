import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // No middleware needed currently
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
