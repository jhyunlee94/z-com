"use client";
// React Query Provider 임

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};
function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        // useQuery 에서 다시 재 설정 가능함
        queries: {
          refetchOnWindowFocus: false, // tab 전환해서 다시 돌아올때
          retryOnMount: true, // 컴포넌트가 언마운트 -> 마운트될때
          refetchOnReconnect: false, // 인터넷 연결이 끊어졌을때
          retry: false, // 재시도하는 기능
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_NODE === "local"}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
