export async function getFollowingPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`,
    {
      next: {
        tags: ["posts", "followings"], // 리액트가 아니라 서버쪽 캐싱임
      },
      credentials: "include",
      cache: "no-store", // cache 안할때 넣어줌
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
