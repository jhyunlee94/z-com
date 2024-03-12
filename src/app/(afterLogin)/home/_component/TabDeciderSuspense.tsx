import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Tabecider from "./Tabecider";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  // 서버에서 불러온 데이터를 클라이언트의 react query 가 물려받는다(넘겨받는다, hydrate)
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor 값
  });
  // 데이터를 불러오고 나면
  const dehydratedState = dehydrate(queryClient);
  // hydrate란 서버에서 온 데이터를 클라이언트에서 그대로 형식에 맞춰서 물려받는거

  return (
    <HydrationBoundary state={dehydratedState}>
      <Tabecider />
    </HydrationBoundary>
  );
}
