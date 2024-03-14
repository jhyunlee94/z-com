"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { throttle } from "lodash";
import Loading from "../loading";
import styles from "@/app/(afterLogin)/home/home.module.css";
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

function useThrottleValue<T>(value: T, throttleDelayMS = 500) {
  const [throttled, setThrottled] = useState<T>();
  const [isThrottling, setIsThrottling] = useState(false);
  useEffect(() => {
    if (!isThrottling) {
      setIsThrottling(true);
      setThrottled(value);
      setTimeout(() => {
        setIsThrottling(false);
      }, throttleDelayMS);
    }
  }, [isThrottling, value, throttleDelayMS]);

  return throttled;
}

export default function PostRecommends() {
  // const throttled = useMemo(() => throttle(getPostRecommends, 1000), []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading, // isPending && isFetching
    isError,
  } = useSuspenseInfiniteQuery<
    // useInfiniteQuery -> useSuspenseInfiniteQuery
    IPost[], // 값 부분
    Object, // 에러부분
    InfiniteData<IPost[]>, // 값 부분
    [_1: string, _2: string], // key 수
    number // initialPageParam 값
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    // queryFn: throttled,
    staleTime: 60 * 1000, // fresh -> stale 시간 (1분)
    gcTime: 300 * 1000, // 기본 5분, inactive 를 봐야함
    // initialData: () => [] // 설정해야지만 reset 됨, 없을경우 그냥 새로 가져옴
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    threshold: 0, // 문턱, 아래 ref 설정한 div 가 보이고 몇 픽셀 뒤에 보일건지 하는거
    // trackVisibility: true,
    delay: 0,
  });

  // console.log("Data", data);

  useEffect(() => {
    if (inView) {
      // 화면에 보일 때
      // const th = throttle(fetchNextPage(), 100);
      !isFetching && hasNextPage && fetchNextPage();
      // hasNextPage && fetchNextPage();
    }
    // }, [inView, isFetching, hasNextPage, fetchNextPage]);
  }, [inView, hasNextPage, fetchNextPage]);

  // if (isPending) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <svg
  //         className={styles.loader}
  //         height="100%"
  //         viewBox="0 0 32 32"
  //         width={40}
  //       >
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
  //         ></circle>
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{
  //             stroke: "rgb(29, 155, 240)",
  //             strokeDasharray: 80,
  //             strokeDashoffset: 60,
  //           }}
  //         ></circle>
  //       </svg>
  //     </div>
  //   );
  // }

  // 클라이언트는 react-query 에서 받아서 써야하고
  // 서버에서 문제라면 error.tsx, loading.tsx 를 써야한다
  // if (isError) {
  //   return "에러 처리해줘";
  // }

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
      <div ref={ref} style={{ height: 100 }}></div>
    </>
  );
}
