import Link from "next/link";
import style from "./post.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post() {
  const target = {
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요ㅠㅠ",
    createdAt: new Date(),
    Images: [],
  };
  return (
    <article className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
          </Link>
          <div className={style.postShade} />
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName} style={{ color: "black" }}>
                {target.User.nickname}
              </span>
              &nbsp;
              <span className={style.postUserId} style={{ color: "black" }}>
                @{target.User.id}
              </span>
              &nbsp; . &nbsp;
              <span className={style.postDate}>
                {dayjs(target.createdAt).fromNow(true)}
              </span>
            </Link>
          </div>

          <div style={{ color: "black" }}>{target.content}</div>
          <div className={style.postImageSection}>
            {/* {target.Images.length > 0 && (
              <div className={style.postImageSection}>
                <img src={target.Images[0]?.link} alt=""></img>
              </div>
            )} */}
          </div>
          {/* <ActionButtons post={post} /> */}
        </div>
      </div>
    </article>
  );
}
