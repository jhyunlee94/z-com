export async function getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`, {
    next: {
      tags: ["posts", "recommends"],
    },
    // cache: "no-store", // cache 안할때 넣어줌
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
