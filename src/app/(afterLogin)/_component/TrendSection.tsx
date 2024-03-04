"use client"; // hook 은 use client 라고 보면됨

import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.css";

export default function TrendSection() {
  const pathname = usePathname();

  if (pathname === "/explore") return null;
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
