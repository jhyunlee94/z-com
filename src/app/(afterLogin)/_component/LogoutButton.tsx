"use client";

import Image from "next/image";
import style from "./logoutButton.module.css";

export default function LogOutButton() {
  const me = {
    id: "zeroch0",
    nickname: "제로초",
    image: "/5Udwvqim.jpg",
  };

  const onLogout = () => {};
  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        {/* <Image src={me.image} alt={me.id} width={20} height={20} /> */}
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
