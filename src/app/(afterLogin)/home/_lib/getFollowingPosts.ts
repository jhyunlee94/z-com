export async function getFollowingPosts() {
  const res = await fetch(`http://localhost:9090/api/followingPosts`, {
    next: {
      tags: ["posts", "followings"], // 리액트가 아니라 서버쪽 캐싱임
    },
    // cache: "no-store", // cache 안할때 넣어줌
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
