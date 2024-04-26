import style from "./singlePost.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getComments } from "./_lib/getComments";
import Comments from "./_component/Comments";

import { Metadata } from "next";
import { Post } from "@/model/Post";
import { User } from "@/model/User";
import { getUserServer } from "../../_lib/getUserServer";
import { getSinglePostServer } from "./_lib/getSinglePostServer";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
