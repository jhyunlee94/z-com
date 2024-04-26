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

  let target = post;

  if (post.Original) {
    target = post.Original;
  }
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
      {post.Original && (
        <div className={style.postReposted}>
          <svg
            viewBox="0 0 24 24"
            width={16}
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
          >
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          재게시했습니다
        </div>
      )}
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
          {target.Parent && (
            <div>
              <Link
                href={`/${target.Parent.User.id}`}
                style={{ color: "rgb(29,155,240" }}
              >
                @{target.Parent.User.id}
              </Link>
              에게 보내는 답글
            </div>
          )}
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
