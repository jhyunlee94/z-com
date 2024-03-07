export { auth as middleware } from "./auth"; // 이름을 바꿔놔서 이게 Export Function Middleware 입니다.

export const config = {
  matcher: ["/compose/tweet", "/home", "explore", "/messages", "search"], // 로그인을 해야지만 접근할 수 있는 페이지들
};
