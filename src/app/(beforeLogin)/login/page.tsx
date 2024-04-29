import Main from "@/app/(beforeLogin)/_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
    return null;
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : login으로갔다가 다시 /i/flow/login으로 됨

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로가기 : localhost:3000 으로 대체됨 이전 히스토리를 없애버리는거임
