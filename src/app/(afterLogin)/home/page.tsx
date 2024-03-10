import Image from "next/image";
import style from "./home.module.css";
import Tap from "./_component/Tap";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

async function getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`, {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store", // cache 안할때 넣어줌
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  // 서버에서 불러온 데이터를 클라이언트의 react query 가 물려받는다(넘겨받는다, hydrate)
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });
  // 데이터를 불러오고 나면
  const dehydratedState = dehydrate(queryClient);
  // hydrate란 서버에서 온 데이터를 클라이언트에서 그대로 형식에 맞춰서 물려받는거

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        {/* hydrate -> HydrateionBoundary입니다 */}
        <TabProvider>
          <Tap />
          {/* Form 은 대부분 client 라고 생각하면 됨 */}
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
