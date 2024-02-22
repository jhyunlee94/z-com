"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import zLogo from "@/../public/zlogo.png";
import style from "@/app/page.module.css";
// import { redirect } from "next/navigation";

export default function Login() {
  // redirect("/i/flow/login");
  const router = useRouter();
  router.replace("/i/flow/login");
  return (
    <>
      <div className={style.left}>
        <Image src={zLogo} alt="logo" />
      </div>
      <div className={style.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={style.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={style.login}>
          {/* <Link href="/i/flow/login" className={style.login}> */}
          로그인
        </Link>
      </div>
    </>
  );
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : login으로갔다가 다시 /i/flow/login으로 됨

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : localhost:3000 으로 대체됨 이전 히스토리를 없애버리는거임
