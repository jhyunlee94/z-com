import Link from "next/link";
import style from "./post.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";

dayjs.locale("ko");

dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: Post;
};
export default function Post({ noImage, post }: Props) {
  // const target = {
  //   postId: 1,
  //   User: {
  //     id: "elonmusk",
  //     nickname: "Elon Musk",
  //     image: "/yRsRRjGO.jpg",
  //   },
  //   content: "클론코딩 라이브로 하니 너무 힘들어요ㅠㅠ",
  //   createdAt: new Date(),
  //   Images: [] as any,
  // };

  const target = post;

  // if (Math.random() > 0.5 && !noImage) {
  //   target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  //   target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  //   target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  //   target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  // }

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation(); // 전파 막기
  };

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
          </Link>
          {/* <div className={style.postShade} /> */}
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; . &nbsp;
              <span className={style.postDate}>
                {dayjs(target.createdAt).fromNow(true)}
              </span>
            </Link>
          </div>

          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons post={post} />
          {/* <ActionButtons postId={post.postId} /> */}
        </div>
      </div>
    </PostArticle>
  );
}
