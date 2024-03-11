"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
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

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale 시간 (1분)
    gcTime: 300 * 1000, // 기본 5분, inactive 를 봐야함
    // initialData: () => [] // 설정해야지만 reset 됨, 없을경우 그냥 새로 가져옴
  });

  // console.log("Data", data);

  return data?.map((post) => (
    // console.log("post", post);
    <Post key={post.postId} post={post} />
  ));
}
