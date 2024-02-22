import style from "@/app/page.module.css";
// tailwind - > 호불호 너무 심하고, 가독성 x
// Styled Component -> Server Component SSR
// sass
// css module -> 간단하게 가자
// vanilla extract -> Windows와 문제
import Image from "next/image";
import Link from "next/link";
import zLogo from "@/../public/zlogo.png";
import Main from "./_component/Main";
export default function Home() {
  return <Main />;
}
