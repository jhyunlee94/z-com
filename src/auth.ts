import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";
import kakaoProvider from "next-auth/providers/kakao";
import { NextResponse } from "next/server";
/**
 *
 * use client에서는 next-auth/react 쓰시고, 서버컴포넌트/액션에서는 @/auth꺼 쓰시면 됩니다.
 * useSession과 auth()의 차이와 동일합니다
 */
export const {
  handlers: { GET, POST }, // API 라우트
  auth, // 로그인 했는지 안했는지 알아내는 용
  signIn, // 로그인 하는 용
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  //   callbacks: {
  //     async authorized({ request, auth }) {
  //       if (!auth) {
  //         return NextResponse.redirect(`http://localhost:3001/i/flow/login`);
  //       }
  //       return true; // 세션이있으면 그냥 그대로 진행
  //     },
  //   },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // username, password 로 고정되어있기에 변경해준거임
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse.ok) {
          // 로그인 실패 이유 적어주면되는거고
          return null;
        }

        const user = await authResponse.json(); // 로그인 성공하면 정보가 여기있고
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
    // kakaoProvider({}),
    //naver , google 또한 존재 공식 문서 참고
  ],
});
