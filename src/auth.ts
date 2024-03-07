import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 *
 * use client에서는 next-auth/react 쓰시고, 서버컴포넌트/액션에서는 @/auth꺼 쓰시면 됩니다.
 * useSession과 auth()의 차이와 동일합니다
 */
export const {
  handlers: { GET, POST }, // API 라우트
  auth, // 로그인 했는지 안했는지 알아내는 용
  signIn, // 로그인 하는 용
} = NextAuth({});
