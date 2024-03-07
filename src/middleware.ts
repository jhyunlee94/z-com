import { NextResponse } from "next/server";
import { auth } from "./auth";

export { auth } from "./auth"; // 이름을 바꿔놔서 이게 Export Function Middleware 입니다.

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(`http://localhost:3001/i/flow/login`);
  }
}

export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"], // 로그인을 해야지만 접근할 수 있는 페이지들
};
