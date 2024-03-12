"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
// async function getPostRecommends() {
//   const res = await fetch(`http://localhost:9090/api/postRecommends`, {
//     next: {
//       tags: ["posts", "recommends"],
//     },
//     // cache: "no-store", // cache 안할때 넣어줌
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[], // 값 부분
    Object, // 에러부분
    InfiniteData<IPost[]>, // 값 부분
    [_1: string, _2: string], // key 수
    number // initialPageParam 값
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale 시간 (1분)
    gcTime: 300 * 1000, // 기본 5분, inactive 를 봐야함
    // initialData: () => [] // 설정해야지만 reset 됨, 없을경우 그냥 새로 가져옴
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    threshold: 1, // 문턱, 아래 ref 설정한 div 가 보이고 몇 픽셀 뒤에 보일건지 하는거
    delay: 0, // 보인 후 몇초 뒤에 호출할건지
  });

  // console.log("Data", data);

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        // console.log("post", post);
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }}></div>
    </>
  );
}
