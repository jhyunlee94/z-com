import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = {
  trend: Hashtag;
};
export default function Trend({ trend }: Props) {
  // console.log("trend", trend);
  return (
    // <Link href={`/search?q=${trend.title}`} className={style.container}>
    <Link
      href={`/search?q=${encodeURIComponent(trend.title)}`}
      className={style.container}
    >
      <div className={style.count}>실시간 트렌드</div>
      {/* <div className={style.title}>{trend.title}</div> */}
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>
        {/* {trend.count.toLocaleString("ko-KR", { maximumFractionDigits: 3 })}
         */}
        {trend.count.toLocaleString()} posts
      </div>
    </Link>
  );
}
