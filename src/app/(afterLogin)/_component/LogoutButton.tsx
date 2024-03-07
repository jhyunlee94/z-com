/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  const { data: me } = useSession(); // client 에서만 쓸수있고 이게 내 정보임
  // const me = {
  //   id: "zeroch0",
  //   nickname: "제로초",
  //   image: "/5Udwvqim.jpg",
  // };

  if (!me?.user) {
    return null;
  }

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };
  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        {/* <Image src={me.image} alt={me.id} width={20} height={20} /> */}
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
