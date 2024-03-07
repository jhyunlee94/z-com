/* eslint-disable import/no-anonymous-default-export */
"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async (
  //   prevState: { message: string | null },
  prevState: any,
  //   prevState: { message: null },
  formData: FormData
) => {
  // formData.get('id')
  "use server";
  // formData 검증
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", // 이게 있어야 쿠키 전달됨
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: "user_exists" };
    }
    console.log(await response.json());
    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    // return; // 이거 넣어주면 에러일때 끝나게 될겁니다.
    return { message: null };
  }

  if (shouldRedirect) {
    redirect("/home"); // try/catch문 안에서 x
    return { message: null };
  }
};
