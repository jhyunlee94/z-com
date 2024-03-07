"use client"; // hook 은 use client 라고 보면됨

import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.css";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  const pathname = usePathname();
  const { data } = useSession();

  if (pathname === "/explore") return null;
  if (data?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3 style={{ color: "black" }}>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
