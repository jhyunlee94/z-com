import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserPosts from "./_components/UserPosts";
import UserInfo from "./_components/UserInfo";

import { getUserPosts } from "./_lib/getUserPosts";
import { getUserServer } from "./_lib/getUserServer";
import { auth } from "@/auth";
import { Metadata } from "next";

import { User } from "@/model/User";

type Props = {
  params: { username: string };
};

// 동적인 Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  // const user = {
  //   id: "zerohch0",
  //   nickname: "제로초",
  //   image: "/5Udwvqim.jpg",
  // };

  // 검색페이지에 노출되는 페이지를 서버사이드 렌더링 하는게 좋음
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
