import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
      cache: "no-store",
      credentials: "include",
      headers: { Cookie: cookies().toString() },
    }
  );

  // page 에 대한 cache 를 다 날려버리는거임
  //   revalidatePath('/home')

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
