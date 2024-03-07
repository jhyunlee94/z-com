// import { ChangeEventHandler, FormEventHandler, useState } from "react";
import style from "./signup.module.css";
import { redirect, useRouter } from "next/navigation";
import BackButton from "./BackButton";

export default function SignupModal() {
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [image, setImage] = useState("");
  // const [imageFile, setImageFile] = useState<File>();

  // const router = useRouter();
  // const onClickClose = () => {
  //   router.back();
  //   // TODO : 뒤로가기가 /home이 아니면 /home으로 보내기
  // };

  // const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setId(e.target.value);
  // };

  // const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setPassword(e.target.value);
  // };

  // const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setNickname(e.target.value);
  // };
  // const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   e.target.files && setImageFile(e.target.files[0]);
  // };

  // const onSubmit: FormEventHandler = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:9090/api/users", {
  //     method: "post",
  //     body: JSON.stringify({
  //       id,
  //       nickname,
  //       image,
  //       password,
  //     }),
  //     credentials: "include",
  //   })
  //     .then((response: Response) => {
  //       console.log(response.status);
  //       if (response.status === 200) {
  //         router.replace("/home");
  //       }
  //     })
  //     .catch((err): any => {
  //       console.error(err);
  //     });
  // };

  const submit = async (formData: FormData) => {
    // formData.get('id')
    "use server";
    // formData 검증
    if (!formData.get("id")) {
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
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
    } catch (err) {
      console.error(err);
      return; // 이거 넣어주면 에러일때 끝나게 될겁니다.
    }

    if (shouldRedirect) {
      redirect("/home"); // try/catch문 안에서 x
    }
  };
  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            {/* <button className={style.closeButton} onClick={onClickClose}>
              <svg
                width={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
              >
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button> */}
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
