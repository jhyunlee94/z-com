"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import zLogo from "@/../public/zlogo.png";
import style from "@/app/page.module.css";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { redirect } from "next/navigation";

export default function Login() {
  // redirect("/i/flow/login");
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   router.replace("/i/flow/login");
  // }, []);

  // if (session) {
  //   router.replace("/home");
  //   return null;
  // }
  if (session) {
    router.replace("/home");
    return null;
  }
  router.replace("/i/flow/login");
  return <Main />;
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : login으로갔다가 다시 /i/flow/login으로 됨

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : localhost:3000 으로 대체됨 이전 히스토리를 없애버리는거임
