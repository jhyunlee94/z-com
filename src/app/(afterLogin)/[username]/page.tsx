import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
export default function Profile() {
  const user = {
    id: "zerohch0",
    nickname: "제로초",
    image: "/5Udwvqim.jpg",
  };
  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 style={{ color: "black" }} className={style.headerTitle}>
          {user.nickname}
        </h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div style={{ color: "black" }}>{user.nickname}</div>
          <div style={{ color: "black" }}>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
